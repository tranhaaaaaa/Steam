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
      <div class="border-b border-gray-700">
    <div class="flex items-center gap-4 mb-4">
      <div class="w-12 h-4 bg-steam-blue-light rounded-full flex items-center justify-center shrink-0 shadow-md mt-15">
       <img src="https://store.cloudflare.steamstatic.com/public/images/applications/store/csgoChat_128_hugs.png?v=6090f9c9c3bd8cb0454b55098bf17b8c" alt="Steam Logo">
      </div>
      <span class="text-white text-xl font-semibold tracking-wider font-bold">Cửa hàng điểm</span>
    </div>
  </div>

  <!-- Points Shop Container -->
  <div class="flex max-w-10xl mx-auto">

    <!-- Sidebar Section -->
    <div class="w-60 bg-[#1e2328] border-r border-[#3c5a74] h-screen sticky top-0 overflow-y-auto">
      <app-points-shop-sidebar></app-points-shop-sidebar>
    </div>
    
    <!-- Main Content Section -->
    <div class="flex-1 bg-[#1b2838] overflow-y-auto">
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