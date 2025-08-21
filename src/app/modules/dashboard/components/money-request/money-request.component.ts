import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StoreRefundRequest } from 'src/app/core/models/db.model';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  selector: 'app-money-request',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './money-request.component.html',
  styleUrls: ['./money-request.component.css']
})
export class MoneyRequestComponent implements OnInit {
  listRefunds: StoreRefundRequest[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Số bản ghi mỗi trang
  totalItems: number = 0; // Tổng số bản ghi

  constructor(
    private walletService: WalletService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData() {
    this.walletService.StoreRefundRequest().subscribe(res => {
      this.listRefunds = res.data;
      this.totalItems = res.data.length; // Cập nhật tổng số bản ghi
    });
  }

  // Lấy bản ghi trong một trang
  get pagedRefunds() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.listRefunds.slice(startIndex, endIndex);
  }

  // Thay đổi trang
  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Tính số trang
  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  // Các phương thức khác của component như onApprove và onReject
  onApprove(refund: any) {
    let formData = {
      note: '',
      status: 'Approved'
    };
    this.walletService.approvalRefund(formData, refund.Id).subscribe(res => {
      this.toastService.success('Đã chấp nhận yêu cầu hoàn tiền!');
      this.onGetData();
    });
  }

  onReject(refund: any) {
    let formData = {
      note: '',
      status: 'Rejected'
    };
    this.walletService.approvalRefund(formData, refund.Id).subscribe(res => {
      this.toastService.success('Yêu cầu đã bị từ chối!');
      this.onGetData();
    });
  }
}
