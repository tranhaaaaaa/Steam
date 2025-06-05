// app/modules/dashboard/dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { CartComponent } from './components/nft/cart/cart.component';
import { PointsShopComponent } from './pages/points-shop/points-shop.component';
import { PointsShopLayoutComponent } from './pages/points-shop/points-shop-layout.component';
import { CommunityComponent } from './components/community/community.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'cart', component: CartComponent },
      { 
        path: 'points-shop', 
        component: PointsShopLayoutComponent,
        children: [
          { path: '', component: PointsShopComponent },
          { path: 'from-games', component: PointsShopComponent },
          { path: 'sales-events', component: PointsShopComponent },
          { path: 'bundles', component: PointsShopComponent },
          { path: 'keyboards', component: PointsShopComponent },
          { path: 'startup-movies', component: PointsShopComponent },
          { path: 'avatars', component: PointsShopComponent },
          { path: 'backgrounds', component: PointsShopComponent },
          { path: 'community-awards', component: PointsShopComponent },
          { path: 'seasonal-badge', component: PointsShopComponent },
          { path: 'game-profiles', component: PointsShopComponent },
          { path: 'showcases', component: PointsShopComponent },
          { path: 'animated-stickers', component: PointsShopComponent },
          { path: 'chat-effects', component: PointsShopComponent },
          { path: 'emoticons', component: PointsShopComponent },
        ]
      },
      { path: 'community', component: CommunityComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}