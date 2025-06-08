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
  templateUrl: './points-shop-sidebar.component.html',
  styleUrls: ['./points-shop-sidebar.component.css'] 
})
export class PointsShopSidebarComponent implements OnInit {
  
  // Dữ liệu sidebar được làm phong phú với icon
  sidebarMenu: SidebarMenuItem[] = [
    {
      group: 'Tiêu biểu',
      items: [
        { label: 'Trang chủ tiêu biểu', route: '/dashboard/points-shop', icon: 'assets/icons/heroicons/outline/home.svg' },
        { label: 'Từ trò chơi của bạn', route: '/dashboard/points-shop/from-games', icon: 'assets/icons/heroicons/outline/puzzle-piece.svg' },
        { label: 'Từ ưu đãi & sự kiện', route: '/dashboard/points-shop/sales-events', icon: 'assets/icons/heroicons/outline/calendar-days.svg' },
        { label: 'Bộ sản phẩm', route: '/dashboard/points-shop/bundles', icon: 'assets/icons/heroicons/outline/archive-box.svg' }
      ]
    },
    {
      group: 'Giao diện',
      items: [
        { label: 'Bàn phím', route: '/dashboard/points-shop/keyboards', icon: 'assets/icons/heroicons/outline/keyboard.svg' },
        { label: 'Phím khởi động', route: '/dashboard/points-shop/startup-movies', icon: 'assets/icons/heroicons/outline/film.svg' }
      ]
    },
    {
      group: 'Hồ sơ',
      items: [
        { label: 'Ảnh đại diện', route: '/dashboard/points-shop/avatars', icon: 'assets/icons/heroicons/outline/user-circle.svg' },
        { label: 'Hình nền', route: '/dashboard/points-shop/backgrounds', icon: 'assets/icons/heroicons/outline/photo.svg' },
        { label: 'Giải thưởng cộng đồng', route: '/dashboard/points-shop/community-awards', icon: 'assets/icons/heroicons/outline/trophy.svg' },
        { label: 'Huy hiệu mùa', route: '/dashboard/points-shop/seasonal-badge', icon: 'assets/icons/heroicons/outline/sparkles.svg' },
        { label: 'Hồ sơ trò chơi', route: '/dashboard/points-shop/game-profiles', icon: 'assets/icons/heroicons/outline/identification.svg' },
        { label: 'Quầy trưng bày', route: '/dashboard/points-shop/showcases', icon: 'assets/icons/heroicons/outline/view-columns.svg' }
      ]
    },
    {
      group: 'Trò chuyện',
      items: [
        { label: 'Hình dán động', route: '/dashboard/points-shop/animated-stickers', icon: 'assets/icons/heroicons/outline/face-smile.svg' },
        { label: 'Hiệu ứng trò chuyện', route: '/dashboard/points-shop/chat-effects', icon: 'assets/icons/heroicons/outline/chat-bubble-left-right.svg' },
        { label: 'Biểu trượng cảm xúc', route: '/dashboard/points-shop/emoticons', icon: 'assets/icons/heroicons/outline/face-wink.svg' }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}