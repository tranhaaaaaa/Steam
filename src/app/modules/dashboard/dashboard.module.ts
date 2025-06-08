// src/app/modules/dashboard/dashboard.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PointsShopLayoutComponent } from './pages/points-shop/points-shop-layout.component';
import { PointsShopSidebarComponent } from './pages/points-shop/points-shop-sidebar.component';// 1. Import vào đây
import { BecauseYouPlayedComponent } from './components/nft/because-you-played/because-you-played.component';
import { CommunityRecommendsComponent } from './components/nft/community-recommends/community-recommends.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PointsShopLayoutComponent,
    PointsShopSidebarComponent,
    BecauseYouPlayedComponent,
    CommunityRecommendsComponent, // 2. Thêm vào mảng imports
  ],
  // declarations: [ NftComponent, ... ] // NftComponent và các component non-standalone khác sẽ ở đây
})
export class DashboardModule {}