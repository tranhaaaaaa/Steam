import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StoreOrder } from 'src/app/core/models/db.model';
import { StoreOrdersService } from 'src/app/core/services/store-orders.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule,FormsModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  public listOrder: StoreOrder[] = [];
  public userLogged = new UserLogged();
  public tempOrder: StoreOrder = new StoreOrder();  // Object to hold order details
  public isDialogOpen: boolean = false;  // Track the modal visibility
  public currentPage: number = 1;
  public dialogReason : boolean = false;
  public reason : string = '';
  public odId : any;
  public amount : number = 0;
  public totalPages: number = 1;
public pagedOrders: StoreOrder[] = [];
  constructor(private storeService: StoreOrdersService,
    private walletService : WalletService,
    private toastService : ToastrService
  ) {}

  ngOnInit(): void {
    this.onGetData();
  }

onGetData() {
  this.storeService.getListOrder().subscribe(res => {
    this.listOrder = res.data.filter((x: any) => x.UserId == this.userLogged.getCurrentUser().userId).reverse();
    this.totalPages = Math.ceil(this.listOrder.length / 10);
    this.updatePagedOrders(); 
  });
}
updatePagedOrders() {
  const start = (this.currentPage - 1) * 10; 
  const end = start + 10; 
  this.pagedOrders = this.listOrder.slice(start, end); 
}
onOpenReason(amount : any,id : any){
  this.amount = amount;
  this.odId = id;
  this.dialogReason = true;
}
onCloseReason(){
  this.dialogReason = false;
}
  viewDetails(order: StoreOrder) {
    this.tempOrder = { ...order };
    this.isDialogOpen = true;  
  }
  getStatusText(status: string): string {
    switch(status) {
      case 'Pending':
        return 'Đang Chờ';
        case 'pending':
        return 'Đang Chờ';
      case 'Success':
        return 'Hoàn Thành';
        case 'COMPLETED':
        return 'Hoàn Thành';
      case 'Cancelled':
        return 'Đã Hủy';
      default:
        return status;
    }
  }
  closeDialog() {
    this.isDialogOpen = false;
  }

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updatePagedOrders(); 
  }
}
  deleteOrder(orderId: string) {
    // this.storeService.deleteOrder(orderId).subscribe(() => {
    //   this.listOrder = this.listOrder.filter(order => order.OrderId !== orderId);
    //   this.totalPages = Math.ceil(this.listOrder.length / 10);
    // });
  }
  onRequestRefund() {
    let formData = {
     orderId : this.odId,
     userId : this.userLogged.getCurrentUser().userId,
     reason : this.reason,
     status: 'pending',
     requestDate : new Date()
    }
    this.walletService.storerefundRequest(formData).subscribe(res => {
      this.toastService.success('Gửi yêu cầu hoàn tiền thành công!');
      this.dialogReason = false;
    }, error => {
      this.toastService.error('Có lỗi xảy ra, hãy kiểm tra lại!','Thất bại!');
      this.dialogReason = false;
    })
  }
}
