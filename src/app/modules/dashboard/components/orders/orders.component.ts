import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreOrder } from 'src/app/core/models/db.model';
import { OrderService } from 'src/app/core/services/order.service';
import { StoreOrdersService } from 'src/app/core/services/store-orders.service';
interface Order {
  id: number;
  gameName: string;
  quantity: number;
  saleDate: string;
  totalPrice: number;
  buyerName : string;
}

@Component({
  selector: 'app-orders',
  imports: [CommonModule,FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  public orders: StoreOrder[] = []; // Dữ liệu gốc
  public filteredOrders: StoreOrder[] = []; 
  public searchTerm: string = '';
  public currentPage: number = 1;
  public itemsPerPage: number = 5; 
  public totalItems: number = 0;
  public totalPages: number = 0;

  constructor(private orderService: OrderService,
    private storeOrdersService: StoreOrdersService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.storeOrdersService.getListOrder().subscribe(data => {
      this.orders = data.data.reverse();
      console.log(this.orders);
      this.totalItems = this.orders.length; 
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage); 
      this.paginateOrders();
    });
  }

  paginateOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredOrders = this.orders.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateOrders();
    }
  }

  // Phương thức tìm kiếm
  // onSearchChange() {
  //   if (this.searchTerm) {
  //     this.filteredOrders = this.orders.filter(order =>
  //       order..toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   } else {
  //     this.paginateOrders(); // Nếu không tìm kiếm, hiển thị lại tất cả đơn hàng
  //   }
  // }

  // Phương thức thêm đơn hàng mới
  onNewOrder() {
    // Logic thêm đơn hàng mới
  }

  // Phương thức xem chi tiết đơn hàng
  onViewOrder(orderId: number) {
    // Logic xem chi tiết đơn hàng
    this.router.navigate(['/dashboard/orders/order-details/', orderId]);
  }

  // Phương thức xóa đơn hàng
  onDeleteOrder(orderId: number) {
    // Logic xóa đơn hàng
  }
}