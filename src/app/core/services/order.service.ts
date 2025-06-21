import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Order {
  id: number;
  gameName: string;
  quantity: number;
  saleDate: string;
  totalPrice: number;
  buyerName: string;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // Mock dữ liệu đơn hàng
  private mockOrders: Order[] = [
    {
      id: 1,
      gameName: 'Game A',
      quantity: 3,
      saleDate: '2025-06-01',
      totalPrice: 150000,
      buyerName: 'Nguyễn Văn A'
    },
    {
      id: 2,
      gameName: 'Game B',
      quantity: 1,
      saleDate: '2025-06-02',
      totalPrice: 50000,
      buyerName: 'Trần Thị B'
    },
    {
      id: 3,
      gameName: 'Game C',
      quantity: 5,
      saleDate: '2025-06-03',
      totalPrice: 250000,
      buyerName: 'Phạm Minh C'
    },
    {
      id: 4,
      gameName: 'Game D',
      quantity: 2,
      saleDate: '2025-06-04',
      totalPrice: 100000,
      buyerName: 'Nguyễn Thanh D'
    },
    {
      id: 5,
      gameName: 'Game E',
      quantity: 10,
      saleDate: '2025-06-05',
      totalPrice: 500000,
      buyerName: 'Lê Thị E'
    },
  ];

  constructor() {}

  // Phương thức trả về dữ liệu giả
  getOrders(): Observable<Order[]> {
    return of(this.mockOrders);  // Trả về Observable với dữ liệu mock
  }

  deleteOrder(orderId: number): Observable<any> {
    // Giả lập xóa đơn hàng (lọc dữ liệu)
    this.mockOrders = this.mockOrders.filter(order => order.id !== orderId);
    return of({ success: true });
  }
}