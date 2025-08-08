import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreOrder } from 'src/app/core/models/db.model';
import { StoreOrdersService } from 'src/app/core/services/store-orders.service';
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
  public totalPages: number = 1;
public pagedOrders: StoreOrder[] = [];
  constructor(private storeService: StoreOrdersService) {}

  ngOnInit(): void {
    this.onGetData();
  }

onGetData() {
  this.storeService.getListOrder().subscribe(res => {
    this.listOrder = res.data.filter((x: any) => x.UserId == this.userLogged.getCurrentUser().userId);
    this.totalPages = Math.ceil(this.listOrder.length / 10);
    this.updatePagedOrders();  // Update the orders for the first page
  });
}
updatePagedOrders() {
  const start = (this.currentPage - 1) * 10; // Calculate the starting index for pagination
  const end = start + 10; // Get the next 10 items
  this.pagedOrders = this.listOrder.slice(start, end);  // Set the sliced array to the displayed list
}

  viewDetails(order: StoreOrder) {
    this.tempOrder = { ...order }; // Clone order data to display in modal
    this.isDialogOpen = true;  // Open the dialog
  }
  getStatusText(status: string): string {
    switch(status) {
      case 'Pending':
        return 'Đang Chờ';
        case 'pending':
        return 'Đang Chờ';
      case 'Completed':
        return 'Hoàn Thành';
      case 'Cancelled':
        return 'Đã Hủy';
      default:
        return status; // Trả về trạng thái gốc nếu không có trường hợp nào khớp
    }
  }
  closeDialog() {
    this.isDialogOpen = false;  // Close the dialog
  }

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updatePagedOrders();  // Update orders when the page changes
  }
}


  deleteOrder(orderId: string) {
    // this.storeService.deleteOrder(orderId).subscribe(() => {
    //   this.listOrder = this.listOrder.filter(order => order.OrderId !== orderId);
    //   this.totalPages = Math.ceil(this.listOrder.length / 10);
    // });
  }
}
