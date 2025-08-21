import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyWallet } from 'src/app/core/models/db.model';
import { WalletService } from 'src/app/core/services/wallet.service';
import { ToastrService } from 'ngx-toastr';
import { RolepermissionService } from 'src/app/core/services/rolepermission.service';
@Component({
  selector: 'app-wallet-request',
  imports: [CommonModule,FormsModule],
  templateUrl: './wallet-request.component.html',
  styleUrl: './wallet-request.component.css'
})
export class WalletRequestComponent implements OnInit{
  public isAdmin = false;
  constructor( private walletService : WalletService,
    private toastService: ToastrService,
    private rolePermission : RolepermissionService
  ) {
    if(this.rolePermission.hasRole(["Admin"]) || this.rolePermission.hasRole(["Staff"])){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
   }
  ngOnInit(): void {
   this.onGetData();
  }

requests = [
    { id: 'TR001', amount: 500, type: 'Nạp tiền', reason: 'Nạp cho tài khoản' },
    { id: 'TR002', amount: 300, type: 'Rút tiền', reason: 'Chi trả hóa đơn' },
    // Add more sample requests as needed
  ];

  isModalOpen = false;
  public myWallet : MyWallet[]=[];
  newRequest = { amount: null, type: 'DEPOSIT', reason: '' };

  openModal() {
    this.isModalOpen = true;
  }
  onGetData(){
    if(this.isAdmin){
         this.walletService.walletTransactionAdmin().subscribe(res => {
           this.myWallet = res.data.items;
         })
    }else{
        this.walletService.walletTransaction().subscribe(res => {
      this.myWallet = res.data;
      console.log("this.myWallet",this.myWallet);
    })
    }
  }
  onApprove(type: number,request: MyWallet) {
    let formData = {
      id : request.Id,
      status : '',
      note : request.note
    }
    if(type == 0){
      formData.status = 'Rejected';
      
    }else{
      formData.status = 'Approved';
    }
    this.walletService.approve(formData).subscribe(res => {
      this.toastService.success('Cập nhật thành công!');
      this.onGetData();
    })
  }
  closeModal() {
    this.isModalOpen = false;
  }

  submitForm() {
    if(this.newRequest.amount == null || this.newRequest.amount <= 0){
      alert("Số tiền phải lớn hơn 0");

      return
    }
    else{
      let formData = {
        amount : this.newRequest.amount,
        type : this.newRequest.type,
        note : this.newRequest.reason
      }
      this.walletService.createRequest(formData).subscribe(res => {
        this.toastService.success('Tạo yêu cầu thành công!');
        this.onGetData();
        this.newRequest = { amount: null, type: 'DEPOSIT', reason: '' };
      },
      error => {
        this.toastService.error('Có lỗi xảy ra, hãy kiểm tra số dư!','Thất bại!');
      })
       this.closeModal();
    }
  }
    getStatusText(status: string): string {
    switch(status) {
      case 'Pending':
        return 'Đang Chờ';
        case 'pending':
        return 'Đang Chờ';
      case 'Success':
        return 'Hoàn Thành';
      case 'Cancelled':
        return 'Đã Hủy';
         case 'DEPOSIT':
        return 'Yêu cầu nạp';
         case 'WITHDRAW':
        return 'Rút tiền';
        case 'APPROVED':
        return 'Yêu cầu được chấp nhận';
        case 'REJECTED':
        return 'Yêu cầu bị từ chối';
      default:
        return status;
    }
  }
}