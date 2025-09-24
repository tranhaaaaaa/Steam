import { Component, OnInit } from '@angular/core';
import { StoreOrder } from 'src/app/core/models/db.model';
import { StoreOrdersService } from 'src/app/core/services/store-orders.service';
import {  CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-report',
  imports: [CommonModule,FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  public orders: StoreOrder[] = [];
  public monthlyRevenue: { month: string, revenue: number, growth?: number, trend?: string }[] = [];
  public currentDate: Date = new Date();

  constructor(private storeOrderService: StoreOrdersService) { }

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData() {
    this.storeOrderService.getListOrder().subscribe(data => {
      this.orders = data.data;
      this.calculateMonthlyRevenue();
    });
  }

  calculateMonthlyRevenue() {
    const filteredOrders = this.orders.filter(order =>
      (order.Status === 'COMPLETE' || order.Status === 'Success')
    );

    const revenueMap: { [key: string]: number } = {};

    // Calculate revenue for each month
    filteredOrders.forEach(order => {
      const orderDate = new Date(order.OrderDate);
      const monthYear = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;

      if (!revenueMap[monthYear]) {
        revenueMap[monthYear] = 0;
      }

      revenueMap[monthYear] += order.TotalAmount; // Giả sử `TotalAmount` là trường lưu doanh thu của đơn hàng
    });

    // Convert data to array and calculate growth percentage and trend
    this.monthlyRevenue = Object.keys(revenueMap).map((month, index, arr) => {
      const revenue = revenueMap[month];
      const growth = index > 0 ? this.calculateGrowth(revenueMap[arr[index - 1]], revenue) : undefined;
      const trend = growth !== undefined ? (growth > 0 ? 'up' : 'down') : undefined;
      
      return { 
        month,
        revenue,
        growth,
        trend
      };
    }).reverse();
  }

  calculateGrowth(prevRevenue: number, currentRevenue: number): number {
    if (prevRevenue === 0) return 0; // Avoid division by 0
    return ((currentRevenue - prevRevenue) / prevRevenue) * 100;
  }
}