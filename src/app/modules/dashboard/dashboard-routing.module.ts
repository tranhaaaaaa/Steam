import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { CartComponent } from './components/nft/cart/cart.component';
import { PointsShopComponent } from './pages/points-shop/points-shop.component';
import { PointsShopLayoutComponent } from './pages/points-shop/points-shop-layout.component';
import { CommunityComponent } from './components/community/community.component';
import { BundlesComponent } from './pages/bundles/bundles.component';
import { KeyboardsComponent } from './pages/keyboards/keyboards.component';
import { AccountLayoutComponent } from './pages/account/account-layout.component';
import { AccountDetailsComponent } from './pages/account/account-details.component';
import { StorePreferencesComponent } from './pages/store-preferences/store-preferences.component';
import { FamilyManagementComponent } from './pages/family-management/family-management.component';
import { SecurityDevicesComponent } from './pages/security-devices/security-devices.component';
import { CookiesBrowsingComponent } from './pages/cookies-browsing/cookies-browsing.component';
import { NotificationSettingsComponent } from './pages/notification-settings/notification-settings.component';
import { GatedAccessComponent } from './pages/gated-access/gated-access.component';
import { LanguagePreferencesComponent } from './pages/language-preferences/language-preferences.component';
import { ManagerUserComponent } from './pages/manager-user/manager-user.component';
import { AddUserComponent } from './pages/manager-user/add-user/add-user.component';
import { GameComponent } from './components/game/game.component';
import { ListGameComponent } from './components/list-game/list-game.component';
import { GameDtComponent } from './components/list-game/game-dt/game-dt.component';
import { GameDetailComponent } from './components/game/game-detail/game-detail.component';
import { Category } from 'src/app/core/models/db.model';
import { CategoryComponent } from './components/category/category.component';
import { TagsComponent } from './components/tags/tags.component';
import { OrdersComponent } from './components/orders/orders.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'account',
        component: AccountLayoutComponent,
        children: [
          { path: '', redirectTo: 'details', pathMatch: 'full' },
          { path: 'details', component: AccountDetailsComponent },
          // Thêm các route cho các tab khác ở đây sau này
          { path: 'store-preferences', component: StorePreferencesComponent },
          { path: 'family-management', component: FamilyManagementComponent },
          { path: 'security', component: SecurityDevicesComponent },
          { path: 'cookies', component: CookiesBrowsingComponent },
          { path: 'notifications', component: NotificationSettingsComponent },
          { path: 'language', component: LanguagePreferencesComponent },
          { path: 'gated-access', component: GatedAccessComponent },
        ]
      },
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'cart', component: CartComponent },
      {
        path: 'points-shop',
        component: PointsShopLayoutComponent,
        children: [
          { path: '', component: PointsShopComponent },
          { path: 'from-games', component: PointsShopComponent },
          { path: 'keyboards', component: KeyboardsComponent },
          { path: 'bundles', component: BundlesComponent },
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
      { path: 'category', component: CategoryComponent },
        { path: 'hastags', component: TagsComponent },
      { path: 'community', component: CommunityComponent },
         { path: 'manager-game', component: GameComponent },
         { path:'orders', component: OrdersComponent },


      {
        path: 'manager-user',
        component: ManagerUserComponent,

        
        // children: [
        //   {
        //     path: 'add-user',
        //     component: AddUserComponent
        //   }
        // ]
      },

      {
      path: 'manager-user/add-user',
      component: AddUserComponent
      },
       {
      path: 'list-game/:name',
      component: ListGameComponent
      },
           {
      path: 'game-detail/:id',
      component: GameDtComponent
      },
        {
      path: 'detail/:id',
      component: GameDetailComponent
      },
         {
      path: 'new-game',
      component: GameDetailComponent
      },
       {
      path: 'manager-user/user-detail/:id',
      component: AddUserComponent
      },




      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }