// app/modules/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PointsShopLayoutComponent } from './pages/points-shop/points-shop-layout.component';
import { PointsShopSidebarComponent } from './pages/points-shop/points-shop-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PointsShopLayoutComponent,
    PointsShopSidebarComponent
  ],
})
export class DashboardModule {}