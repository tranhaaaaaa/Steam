import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Discount } from 'src/app/core/models/db.model';
import { GameService } from 'src/app/core/services/game.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DiscountComponent implements OnInit {
  public listDiscount: Discount[] = [];
  public searchTerm: string = '';
  public currentPage: number = 1;
  public totalPages: number = 1;
  public isDialogOpen: boolean = false;
  public dialogMode: string = 'add'; // 'add' or 'edit'
  public tempDiscount: Discount = new Discount();

  constructor(private gameService: GameService,
    private toastrService : ToastrService
  ) {}

  ngOnInit(): void {
    this.onGetData();
  }

  // Lấy dữ liệu giảm giá từ API
  onGetData() {
    this.gameService.getListDiscount().subscribe(data => {
      this.listDiscount = data.data;
      this.totalPages = Math.ceil(this.listDiscount.length / 10); // Giả sử 10 mục mỗi trang
      this.changePage(this.currentPage); // Cập nhật phân trang khi lấy dữ liệu mới
    });
  }

  // Lọc danh sách theo mã giảm giá
  onSearchChange() {
    const filtered = this.listDiscount.filter(discount =>
      discount.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(filtered.length / 10);
    this.listDiscount = filtered.slice((this.currentPage - 1) * 10, this.currentPage * 10);
  }

  // Thay đổi trang phân trang
  changePage(page: number) {
    this.currentPage = page;
    this.onSearchChange(); // Cập nhật tìm kiếm lại nếu có
  }

  // Mở dialog để thêm hoặc chỉnh sửa giảm giá
  openDialog(mode: string, discount?: Discount) {
    this.dialogMode = mode;
    if (mode === 'edit' && discount) {
      this.tempDiscount = { ...discount };
    } else {
      this.tempDiscount = new Discount(); // Reset form cho thêm mới
    }
    this.isDialogOpen = true;
  }

  // Đóng dialog
  closeDialog() {
    this.isDialogOpen = false;
  }

  // Lưu hoặc cập nhật giảm giá
  saveDiscount(form: any) {
    if (form.valid) {
      if (this.dialogMode === 'add') {
        this.gameService.addDiscount(this.tempDiscount).subscribe(() => {
          this.onGetData(); // Cập nhật dữ liệu sau khi thêm
          this.closeDialog();
          this.toastrService.success("Thêm giảm giá thành công!");
        }
      ,error => {
        this.toastrService.error("Có lỗi xảy ra, hãy kiểm tra lại thời gian","Thất bại");
      });
      } else {
        this.gameService.updateDiscount(this.tempDiscount, this.tempDiscount.id).subscribe(() => {
          this.onGetData(); // Cập nhật dữ liệu sau khi sửa
          this.toastrService.success("Cập nhật giảm giá thành công!");
          this.closeDialog();
        });
      }
    }
  }

  // Xóa giảm giá
  deleteDiscount(id: number) {
    this.gameService.deleteDiscount(id).subscribe(() => {
      this.onGetData();
      this.toastrService.success("Xóa giảm giá thành công!"); // Cập nhật dữ liệu sau khi xóa
    },
    error => {
      this.toastrService.error(error.error.text);
    });
  }
}
