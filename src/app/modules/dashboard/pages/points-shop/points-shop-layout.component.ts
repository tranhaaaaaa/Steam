// app/modules/dashboard/pages/points-shop/points-shop-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
// 1. Import component bạn muốn sử dụng
import { PointsShopSidebarComponent } from './points-shop-sidebar.component';

@Component({
  selector: 'app-points-shop-layout',
  standalone: true,
  // 2. Thêm component vào mảng imports
  imports: [CommonModule, RouterOutlet, AngularSvgIconModule, PointsShopSidebarComponent],
  template: `
    <div class="min-h-screen bg-[#1b2838] text-white">
      <!-- Points Shop Container -->
      <div class="flex max-w-7xl mx-auto">
        <!-- Sidebar Menu -->
        <div class="w-60 bg-[#1e2328] border-r border-[#3c5a74] h-screen sticky top-0">
          <app-points-shop-sidebar></app-points-shop-sidebar>
        </div>
        
        <!-- Main Content -->
        <div class="flex-1 bg-[#1b2838]">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./points-shop-layout.component.css']
})
export class PointsShopLayoutComponent implements OnInit {
  ngOnInit(): void {}
}