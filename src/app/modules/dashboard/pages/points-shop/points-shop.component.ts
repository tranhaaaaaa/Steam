// app/modules/dashboard/pages/points-shop/points-shop.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface PointsItem {
  id: number;
  title: string;
  points: number;
  image: string;
  type: 'game_profile' | 'seasonal_badge' | 'sticker' | 'background' | 'emoticon' | 'startup_movie' | 'avatar_frame' | 'mini_profile_background' | 'chat_effect';
  itemTypeLabel: string;
  discount?: number;       // Thêm lại thuộc tính optional
  originalPoints?: number; // Thêm lại thuộc tính optional
}

interface PointsSection {
  title: string;
  subtitle?: string;
  type: string;
  items: PointsItem[];
  showMoreLink?: boolean;
  itemWidthClass?: string;
}

@Component({
  selector: 'app-points-shop',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './points-shop.component.html',
  styleUrls: ['./points-shop.component.css']
})
export class PointsShopComponent implements OnInit {
  
  pointsBalance = 28420; // Current user points
  
  pointsSections: PointsSection[] = [
    {
      title: 'Vật phẩm: Ưu đãi mùa xuân 2025',
      type: 'seasonal_items',
      showMoreLink: true,
      itemWidthClass: 'w-item-standard',
      items: [
        { id: 1, title: 'Khởi đầu hoang dã', points: 5000, image: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/3558910/cbbd5177595cf627e66993f6ee5818ce71d0deac.jpg', type: 'game_profile', itemTypeLabel: 'Game Profile' },
        { id: 2, title: 'Ưu đã mùa xuân 2025', points: 1000, image: 'https://steamcommunity.com/economy/profilebackground/items/3558910/f97177127f867d8763d26d3bf6cbee2d32bc40c7.jpg', type: 'background', itemTypeLabel: 'Profile Background' },
        { id: 3, title: 'SPRING SALE 2025 GREEN', points: 1000, image: 'https://steamcommunity.com/economy/profilebackground/items/3558910/75522ab719f27cec0b71483c9c9e4195d98ddd75.jpg', type: 'background', itemTypeLabel: 'Profile Background' },
        { id: 4, title: 'SPRING SALE 2025 PINK', points: 1000, image: 'https://steamcommunity.com/economy/profilebackground/items/3558910/5f2cbf32a1e6f1fc8d61ec0f31d4d1c41d2fb0a3.jpg', type: 'background', itemTypeLabel: 'Profile Background' },
        { id: 5, title: 'STEAM SCREAM 2023 TENTACLE', points: 1000, image: 'https://steamcommunity.com/economy/profilebackground/items/3558910/ec3ed9034374c6fe9c72cc764bd08abe6ea57c56.jpg', type: 'background', itemTypeLabel: 'Profile Background' },
      ],
    },
    // ... các section dữ liệu khác giữ nguyên như cũ
     {
      title: 'Lunar New Year 2025 Items',
      type: 'seasonal_items',
      itemWidthClass: 'w-item-sticker',
      showMoreLink: true,
      items: [
        { id: 6, title: 'HAPPY NEW YEAR 2025', points: 1000, image: 'https://steamcommunity.com/economy/profilebackground/items/2603600/9bf3bb3481f2411fe5f4ec879ee0c0a90c59a738.jpg', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 7, title: 'STEAM SNEK 2025', points: 1000, image: 'src="https://steamcommunity.com/economy/profilebackground/items/3558910/f97177127f867d8763d26d3bf6cbee2d32bc40c7.jpg"', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 8, title: 'RED ENVELOPE 2025', points: 1000, image: 'https://steamcommunity.com/economy/profilebackground/items/2855130/dad0cea53e902698072c1fbcdd523bffff90fc55.jpg', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 9, title: 'SNAKE IN A BLANKET', points: 0, image: 'https://steamcommunity.com/economy/profilebackground/items/2842700/24aa3accaaecb97f9b8aa71c03000061009e119a.jpg', type: 'sticker', itemTypeLabel: 'Animated Sticker' }
      ],
    },
    {
      title: 'All Steam Startup Movies',
      subtitle: 'Personalize your Steam Deck or Big Picture Mode startup sequence.',
      type: 'startup_movies',
      itemWidthClass: 'w-item-movie',
      showMoreLink: true,
      items: [
        { id: 10, title: 'SPECIAL DELIVERY', points: 3000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1675200/a35796265a4d21430e3ac81c817d8d21a2c3d5e7.png', type: 'startup_movie', itemTypeLabel: 'Steam Startup Movie' },
        { id: 11, title: 'ELDEN RING RANNI', points: 3000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1245620/9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2a1b0.png', type: 'startup_movie', itemTypeLabel: 'Steam Startup Movie' },
        { id: 12, title: 'HADES', points: 3000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1145360/1b0c9d8a7b3b0a10d5231a4b2e8f6e2c7a6b4d0.png', type: 'startup_movie', itemTypeLabel: 'Steam Startup Movie' },
        { id: 13, title: 'GOD OF WAR RAGNAROK', points: 3000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1593500/0d5231a4b2e8f6e2c7a6b4d0b1a0c9d8a7b3b0a1.png', type: 'startup_movie', itemTypeLabel: 'Steam Startup Movie' },
        { id: 14, title: 'THE LAST OF US™ PART I', points: 3000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1888930/a7b3b0a10d5231a4b2e8f6e2c7a6b4d0b1a0c9d8.png', type: 'startup_movie', itemTypeLabel: 'Steam Startup Movie' },
      ],
    },
    {
      title: 'Hình dán động nổi tiếng',
      subtitle: 'See All (1,842)',
      type: 'animated_stickers',
      itemWidthClass: 'w-item-sticker',
      showMoreLink: true,
      items: [
        { id: 15, title: 'CAT CAM TALKING', points: 1000, image: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/637310/979bb2133de5a89a3f7a0524f8a1d27163301f6d.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 16, title: 'AK47', points: 1000, image: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/805940/d7009aa6251d141048ca3a22545d5c9b85f19289.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 17, title: 'CATO_DANCE', points: 1000, image: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1999520/32c2acde83968cd6d6bfa1ee9b9f11cec89f82c2.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 18, title: 'BUTT SCRATCHING', points: 1000, image: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1260320/cc368c64c6ecad7377f0481e3e4978894e11d854.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 19, title: 'WINKWINK', points: 1000, image: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2873080/6cee956fe98ee42e49c990a3ed5554be6a761a78.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
      ],
    },
    {
      title: 'Popular Chat Effects',
      subtitle: 'Send a message with a little more Oomph in Steam Chat.',
      type: 'chat_effects',
      itemWidthClass: 'w-item-sticker',
      showMoreLink: true,
      items: [
        { id: 20, title: 'FIREWORKS', points: 1500, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1675200/4c2670a1c7de9c2b1aeb7653a50f6b48ac3fc269.png', type: 'chat_effect', itemTypeLabel: 'Chat Effect' },
        { id: 21, title: 'CONFETTI', points: 1500, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1675200/8fc7bb36b63fcbc2b6d3d4c51d71b8a9c5c8f1d2.png', type: 'chat_effect', itemTypeLabel: 'Chat Effect' },
        { id: 22, title: 'BALLOONS', points: 1500, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1675200/2f3b0e8a9c6d5a7e1f4c8b9d3e2a5c7f8b1d4e6a.png', type: 'chat_effect', itemTypeLabel: 'Chat Effect' },
        { id: 23, title: 'GOLD CONFETTI', points: 1500, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1675200/5e8a2f1c9b6d4a7e3f2c8b5d1a4e7c9f6b2e5a8d.png', type: 'chat_effect', itemTypeLabel: 'Chat Effect' },
      ],
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  

   getItemTypeIcon(type: string): string {
    const icons = {
      'game_profile': 'assets/icons/heroicons/outline/identification.svg',
      'background': 'assets/icons/heroicons/outline/photo.svg',
      'sticker': 'assets/icons/heroicons/outline/face-smile.svg',
      'startup_movie': 'assets/icons/heroicons/outline/film.svg',
      'avatar_frame': 'assets/icons/heroicons/outline/user-circle.svg',
      'mini_profile_background': 'assets/icons/heroicons/outline/view-columns.svg',
      'emoticon': 'assets/icons/heroicons/outline/face-wink.svg',
      'seasonal_badge': 'assets/icons/heroicons/outline/sparkles.svg',
      'chat_effect': 'assets/icons/heroicons/outline/chat-bubble-left-right.svg'
    };
    return icons[type as keyof typeof icons] || 'assets/icons/heroicons/outline/question-mark-circle.svg';
  }

  formatPoints(points: number): string {
    if (points === 0) return 'Free';
    return points.toLocaleString();
  }

  scrollItems(sectionIndex: number, direction: 'left' | 'right'): void {
    const grid = document.getElementById(`items-grid-${sectionIndex}`);
    if (grid) {
      const scrollAmount = (grid.firstElementChild?.clientWidth || 280) + 16;
      grid.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'https://via.placeholder.com/280x160/171a21/8f98a0?text=Image+Not+Found';
    }
  }
}