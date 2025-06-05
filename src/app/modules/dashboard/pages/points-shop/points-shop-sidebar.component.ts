// app/modules/dashboard/pages/points-shop/points-shop-sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface SidebarMenuItem {
  group: string;
  items: {
    label: string;
    route: string;
    icon: string; // Sử dụng icon thật
  }[];
}

@Component({
  selector: 'app-points-shop-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AngularSvgIconModule],
  templateUrl: './points-shop-sidebar.component.html', // Sẽ cập nhật template này ở bước sau
  styleUrls: ['./points-shop-sidebar.component.css'] // Sẽ cập nhật CSS này ở bước sau
})
export class PointsShopSidebarComponent implements OnInit {
  
  // Dữ liệu sidebar được làm phong phú với icon
  sidebarMenu: SidebarMenuItem[] = [
    {
      group: 'FEATURED',
      items: [
        { label: 'Featured Home', route: '/dashboard/points-shop', icon: 'assets/icons/heroicons/outline/home.svg' },
        { label: 'From Your Games', route: '/dashboard/points-shop/from-games', icon: 'assets/icons/heroicons/outline/puzzle-piece.svg' },
        { label: 'From Sales & Events', route: '/dashboard/points-shop/sales-events', icon: 'assets/icons/heroicons/outline/calendar-days.svg' },
        { label: 'Bundles', route: '/dashboard/points-shop/bundles', icon: 'assets/icons/heroicons/outline/archive-box.svg' }
      ]
    },
    {
      group: 'INTERFACE',
      items: [
        { label: 'Keyboards', route: '/dashboard/points-shop/keyboards', icon: 'assets/icons/heroicons/outline/keyboard.svg' },
        { label: 'Startup Movies', route: '/dashboard/points-shop/startup-movies', icon: 'assets/icons/heroicons/outline/film.svg' }
      ]
    },
    {
      group: 'PROFILE',
      items: [
        { label: 'Avatars', route: '/dashboard/points-shop/avatars', icon: 'assets/icons/heroicons/outline/user-circle.svg' },
        { label: 'Backgrounds', route: '/dashboard/points-shop/backgrounds', icon: 'assets/icons/heroicons/outline/photo.svg' },
        { label: 'Community Awards', route: '/dashboard/points-shop/community-awards', icon: 'assets/icons/heroicons/outline/trophy.svg' },
        { label: 'Seasonal Badge', route: '/dashboard/points-shop/seasonal-badge', icon: 'assets/icons/heroicons/outline/sparkles.svg' },
        { label: 'Game Profiles', route: '/dashboard/points-shop/game-profiles', icon: 'assets/icons/heroicons/outline/identification.svg' },
        { label: 'Showcases', route: '/dashboard/points-shop/showcases', icon: 'assets/icons/heroicons/outline/view-columns.svg' }
      ]
    },
    {
      group: 'CHAT',
      items: [
        { label: 'Animated Stickers', route: '/dashboard/points-shop/animated-stickers', icon: 'assets/icons/heroicons/outline/face-smile.svg' },
        { label: 'Chat Effects', route: '/dashboard/points-shop/chat-effects', icon: 'assets/icons/heroicons/outline/chat-bubble-left-right.svg' },
        { label: 'Emoticons', route: '/dashboard/points-shop/emoticons', icon: 'assets/icons/heroicons/outline/face-wink.svg' }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}