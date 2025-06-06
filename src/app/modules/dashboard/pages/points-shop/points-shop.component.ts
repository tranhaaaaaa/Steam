// app/modules/dashboard/pages/points-shop/points-shop.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router } from '@angular/router'; 
interface PointsItem {
  id: number;
  title: string;
  points: number;
  image: string;
  type: 'game_profile' | 'seasonal_badge' | 'sticker' | 'background' | 'emoticon' | 'startup_movie' | 'avatar_frame' | 'mini_profile_background' | 'chat_effect' | 'animated_avatar';
  itemTypeLabel: string;
  gameIcon?: string; // Icon nhỏ của game ở góc
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
    public pointsSections: PointsSection[] = [];

  
  featuredSections: PointsSection[] = [
    {
      title: 'Spring Sale 2025 Items',
      type: 'seasonal_items',
      showMoreLink: true,
      itemWidthClass: 'w-item-standard',
      items: [
        { id: 1, title: 'WILD BEGINNINGS', points: 5000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/5951828a23114f23ab0321c82859389b51465940.png', type: 'game_profile', itemTypeLabel: 'Game Profile' },
        { id: 2, title: 'SPRING SALE 2025 SPACE', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/7b2961a894a8f3e5e6e3d2c9c7e4a3b1b6f0a9e8.png', type: 'background', itemTypeLabel: 'Profile Background' },
        { id: 3, title: 'SPRING SALE 2025 GREEN', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/0d5231a4b2e8f6e2c7a6b4d0b1a0c9d8a7b3b0a1.png', type: 'background', itemTypeLabel: 'Profile Background' },
        { id: 4, title: 'SPRING SALE 2025 PINK', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/e8b1a0c9d8a7b3b0a10d5231a4b2e8f6e2c7a6b4.png', type: 'background', itemTypeLabel: 'Profile Background' },
        { id: 5, title: 'STEAM SCREAM 2023 TENTACLE', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/4c2670a1c7de9c2b1aeb7653a50f6b48ac3fc269.png', type: 'background', itemTypeLabel: 'Profile Background' },
      ],
    },
    // ... các section dữ liệu khác giữ nguyên như cũ
     {
      title: 'Lunar New Year 2025 Items',
      type: 'seasonal_items',
      itemWidthClass: 'w-item-sticker',
      showMoreLink: true,
      items: [
        { id: 6, title: 'HAPPY NEW YEAR 2025', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/4e9d3c8b5d1a4e7c9f6b2e5a8d5e8a2f1c9b6d4a.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 7, title: 'STEAM SNEK 2025', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/c9f6b2e5a8d5e8a2f1c9b6d4a7e3f2c8b5d1a4e7.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 8, title: 'RED ENVELOPE 2025', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/a4e7c9f6b2e5a8d5e8a2f1c9b6d4a7e3f2c8b5d1.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 9, title: 'SNAKE IN A BLANKET', points: 0, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/b5d1a4e7c9f6b2e5a8d5e8a2f1c9b6d4a7e3f2c8.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' }
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
      title: 'Popular Animated Stickers',
      subtitle: 'See All (1,842)',
      type: 'animated_stickers',
      itemWidthClass: 'w-item-sticker',
      showMoreLink: true,
      items: [
        { id: 15, title: 'CAT CAM TALKING', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/570/0e8f7a6b5c4d3e2a1b0c9d8a7b3b0a10d5231a4b.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 16, title: 'AK47', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/730/b0a10d5231a4b2e8f6e2c7a6b4d0b1a0c9d8a7b3.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 17, title: 'CATO_DANCE', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/238460/a7b3b0a10d5231a4b2e8f6e2c7a6b4d0b1a0c9d8.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 18, title: 'BUTT SCRATCHING', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/230410/c7a6b4d0b1a0c9d8a7b3b0a10d5231a4b2e8f6e2.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
        { id: 19, title: 'WINKWINK', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1091500/f6e2c7a6b4d0b1a0c9d8a7b3b0a10d5231a4b2e8.png', type: 'sticker', itemTypeLabel: 'Animated Sticker' },
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

  private salesAndEventsSections: PointsSection[] = [
    {
      title: 'Spring Sale 2025',
      subtitle: 'See All (15)',
      type: 'seasonal_items',
      showMoreLink: false,
      itemWidthClass: 'w-item-standard',
      items: [
        { id: 1, title: 'WILD BEGINNINGS', points: 5000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/5951828a23114f23ab0321c82859389b51465940.png', type: 'game_profile', itemTypeLabel: 'Game Profile', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2687520/5a91462025617c67761c84a8775d158133565245.jpg' },
        { id: 24, title: 'FEATHERED FRIEND', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/8a7b3b0a10d5231a4b2e8f6e2c7a6b4d0b1a0c9d.png', type: 'sticker', itemTypeLabel: 'Animated Sticker', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2687520/5a91462025617c67761c84a8775d158133565245.jpg' },
        { id: 25, title: 'BLOOMING BUDDY', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/9d8a7b3b0a10d5231a4b2e8f6e2c7a6b4d0b1a0c.png', type: 'sticker', itemTypeLabel: 'Animated Sticker', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2687520/5a91462025617c67761c84a8775d158133565245.jpg' },
        { id: 26, title: 'GEO-GATHERER', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/c9d8a7b3b0a10d5231a4b2e8f6e2c7a6b4d0b1a0.png', type: 'sticker', itemTypeLabel: 'Animated Sticker', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2687520/5a91462025617c67761c84a8775d158133565245.jpg' },
        { id: 27, title: 'OUTLAND OBSERVER', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/b4d0b1a0c9d8a7b3b0a10d5231a4b2e8f6e2c7a6.png', type: 'sticker', itemTypeLabel: 'Animated Sticker', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2687520/5a91462025617c67761c84a8775d158133565245.jpg' },
      ]
    },
    {
      title: 'Lunar New Year 2025',
      type: 'seasonal_items',
      showMoreLink: false,
      itemWidthClass: 'w-item-sticker',
      items: [
        { id: 28, title: 'LUNAR2025SNAKEINABLANKET', points: 0, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2824970/e8f6e2c7a6b4d0b1a0c9d8a7b3b0a10d5231a4b2.png', type: 'emoticon', itemTypeLabel: 'Emoticon', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2824970/2f3b0e8a9c6d5a7e1f4c8b9d3e2a5c7f8b1d4e6a.jpg' },
        { id: 9, title: 'SNAKE IN A BLANKET', points: 0, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/b5d1a4e7c9f6b2e5a8d5e8a2f1c9b6d4a7e3f2c8.png', type: 'sticker', itemTypeLabel: 'Animated Sticker', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2824970/2f3b0e8a9c6d5a7e1f4c8b9d3e2a5c7f8b1d4e6a.jpg' },
        { id: 6, title: 'HAPPY NEW YEAR 2025', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/4e9d3c8b5d1a4e7c9f6b2e5a8d5e8a2f1c9b6d4a.png', type: 'sticker', itemTypeLabel: 'Animated Sticker', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2824970/2f3b0e8a9c6d5a7e1f4c8b9d3e2a5c7f8b1d4e6a.jpg' },
        { id: 7, title: 'STEAM SNAKE 2025', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/c9f6b2e5a8d5e8a2f1c9b6d4a7e3f2c8b5d1a4e7.png', type: 'sticker', itemTypeLabel: 'Animated Sticker', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2824970/2f3b0e8a9c6d5a7e1f4c8b9d3e2a5c7f8b1d4e6a.jpg' },
        { id: 8, title: 'RED ENVELOPE 2025', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2687520/a4e7c9f6b2e5a8d5e8a2f1c9b6d4a7e3f2c8b5d1.png', type: 'sticker', itemTypeLabel: 'Animated Sticker', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2824970/2f3b0e8a9c6d5a7e1f4c8b9d3e2a5c7f8b1d4e6a.jpg' },
      ]
    },
    {
      title: 'Steam Scream 2024',
      subtitle: 'See All (10)',
      type: 'seasonal_items',
      showMoreLink: false,
      itemWidthClass: 'w-item-standard',
      items: [
        { id: 29, title: 'MOVIE TICKET', points: 2000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2539840/e2c7a6b4d0b1a0c9d8a7b3b0a10d5231a4b2e8f6.png', type: 'avatar_frame', itemTypeLabel: 'Avatar Frame', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2539840/5a91462025617c67761c84a8775d158133565245.jpg' },
        { id: 30, title: '3D BONES', points: 3000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2539840/a10d5231a4b2e8f6e2c7a6b4d0b1a0c9d8a7b3b0.png', type: 'animated_avatar', itemTypeLabel: 'Animated Avatar', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2539840/5a91462025617c67761c84a8775d158133565245.jpg' },
        { id: 31, title: 'HAUNTED THEATER', points: 5000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2539840/b0a10d5231a4b2e8f6e2c7a6b4d0b1a0c9d8a7b3.png', type: 'game_profile', itemTypeLabel: 'Game Profile', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2539840/5a91462025617c67761c84a8775d158133565245.jpg' },
        { id: 32, title: 'SKULLPOP', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2539840/d8a7b3b0a10d5231a4b2e8f6e2c7a6b4d0b1a0c9.png', type: 'sticker', itemTypeLabel: 'Animated Sticker', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2539840/5a91462025617c67761c84a8775d158133565245.jpg' },
        { id: 33, title: 'GHOSTCAKE', points: 1000, image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2539840/7b3b0a10d5231a4b2e8f6e2c7a6b4d0b1a0c9d8a.png', type: 'sticker', itemTypeLabel: 'Animated Sticker', gameIcon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/2539840/5a91462025617c67761c84a8775d158133565245.jpg' },
      ]
    }
  ];

    // 5. Hàm kiểm tra URL để hiển thị header tương ứng
    isSalesAndEventsPage(): boolean {
    return this.router.url.includes('/sales-events');
  }

  constructor(private router: Router) { }

    ngOnInit(): void {
    // 3. Quyết định dữ liệu nào sẽ được hiển thị dựa trên URL
    if (this.router.url.includes('/sales-events')) {
      this.pointsSections = this.salesAndEventsSections;
    } else {
      this.pointsSections = this.featuredSections;
    }
  }

  

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