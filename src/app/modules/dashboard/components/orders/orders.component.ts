import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';
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
  public orders: Order[] = []; // Dữ liệu gốc
  public filteredOrders: Order[] = []; // Dữ liệu đã lọc và phân trang
  public searchTerm: string = '';
  public currentPage: number = 1;
  public itemsPerPage: number = 2; 
  public totalItems: number = 0;
  public totalPages: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders(); // Tải danh sách đơn hàng khi component được khởi tạo
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data; // Lưu dữ liệu gốc
      this.totalItems = this.orders.length; // Tính tổng số đơn hàng
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage); // Tính tổng số trang
      this.paginateOrders(); // Phân trang đơn hàng
    });
  }

  // Phương thức phân trang đơn hàng
  paginateOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredOrders = this.orders.slice(startIndex, endIndex); // Cập nhật danh sách đơn hàng đã phân trang
  }

  // Phương thức thay đổi trang
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateOrders();
    }
  }

  // Phương thức tìm kiếm
  onSearchChange() {
    if (this.searchTerm) {
      this.filteredOrders = this.orders.filter(order =>
        order.gameName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.paginateOrders(); // Nếu không tìm kiếm, hiển thị lại tất cả đơn hàng
    }
  }

  // Phương thức thêm đơn hàng mới
  onNewOrder() {
    // Logic thêm đơn hàng mới
  }

  // Phương thức xem chi tiết đơn hàng
  onViewOrder(orderId: number) {
    // Logic xem chi tiết đơn hàng
  }

  // Phương thức xóa đơn hàng
  onDeleteOrder(orderId: number) {
    // Logic xóa đơn hàng
  }
}