// src/app/modules/dashboard/pages/profile/profile.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UserLogged } from 'src/app/core/utils/userLogged';

// Định nghĩa cấu trúc dữ liệu (giữ nguyên)
interface UserProfile {
  username: string;
  realName: string;
  country: string;
  avatarUrl: string;
  level: number;
  motto: string;
  status: string;
}

interface FeaturedBadge {
  title: string;
  xp: number;
  imageUrl: string;
}

interface ProfileBadge {
  name: string;
  imageUrl: string;
}

interface GameActivity {
  gameTitle: string;
  bannerUrl: string;
  playtime: string;
  lastPlayed: string;
  achievementsUnlocked: number;
  achievementsTotal: number;
  achievementIcons: string[];
  review?: {
    text: string;
    likes: number;
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   userLogged = new UserLogged();
  // Dữ liệu giả cho hồ sơ người dùng
  userProfile: UserProfile = {
    username: this.userLogged.getCurrentUser().username,
    realName: 'Nguyễn Thái Long Vũ',
    country: 'Viet Nam',
    // UPDATED: Avatar ngẫu nhiên từ Picsum, seed 'vuvitgaming' để ảnh không đổi mỗi lần tải lại
    avatarUrl: 'https://picsum.photos/seed/vuvitgaming/184/184',
    level: 3,
    motto: 'Đẹp trai tạo nên sự quý tộc',
    status: 'Đang trên mạng'
  };

  // Dữ liệu giả cho huy hiệu nổi bật
  featuredBadge: FeaturedBadge = {
    title: 'Community Patron',
    xp: 150,
    // UPDATED: Huy hiệu ngẫu nhiên
    imageUrl: 'https://picsum.photos/seed/featuredBadge/96/96'
  };

  // Dữ liệu giả cho các huy hiệu khác
  profileBadges: ProfileBadge[] = [
    { name: 'Years of Service', imageUrl: 'https://community.akamai.steamstatic.com/public/images/badges/02_years/3.png' },
    { name: 'Game Collector', imageUrl: 'https://community.akamai.steamstatic.com/public/images/badges/13_gamecollector/10.png' },
    // UPDATED: Thêm một huy hiệu ngẫu nhiên
    { name: 'Pixel Pioneer', imageUrl: 'https://picsum.photos/seed/pixelBadge/40/40' }
  ];

  // Dữ liệu giả cho hoạt động game gần đây với các icon thành tựu đa dạng và hoạt động
  recentActivity: GameActivity[] = [
    {
      gameTitle: 'Sekiro™: Shadows Die Twice',
      bannerUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/814380/header.jpg',
      playtime: '',
      lastPlayed: '',
      achievementsUnlocked: 34,
      achievementsTotal: 34,
      // UPDATED: Các icon thành tựu ngẫu nhiên và khác nhau
      achievementIcons: [
        'https://picsum.photos/seed/sekiro1/32/32',
        'https://picsum.photos/seed/sekiro2/32/32',
        'https://picsum.photos/seed/sekiro3/32/32',
        'https://picsum.photos/seed/sekiro4/32/32',
        'https://picsum.photos/seed/sekiro5/32/32',
      ]
    },
    {
      gameTitle: 'ELDEN RING',
      bannerUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
      playtime: '',
      lastPlayed: '',
      achievementsUnlocked: 42,
      achievementsTotal: 42,
      // UPDATED: Các icon thành tựu ngẫu nhiên và khác nhau
      achievementIcons: [
        'https://picsum.photos/seed/elden1/32/32',
        'https://picsum.photos/seed/elden2/32/32',
        'https://picsum.photos/seed/elden3/32/32',
        'https://picsum.photos/seed/elden4/32/32',
      ],
      review: { text: 'Đánh giá 1', likes: 1 }
    },
    {
      gameTitle: 'Cyberpunk 2077', // Thêm game mới cho đa dạng
      bannerUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
      playtime: '120 giờ được ghi nhận',
      lastPlayed: 'chơi lần cuối lúc 26 Thg06',
      achievementsUnlocked: 30,
      achievementsTotal: 45,
      // UPDATED: Các icon thành tựu ngẫu nhiên và khác nhau
      achievementIcons: [
        'https://picsum.photos/seed/cyber1/32/32',
        'https://picsum.photos/seed/cyber2/32/32',
        'https://picsum.photos/seed/cyber3/32/32',
        'https://picsum.photos/seed/cyber4/32/32',
        'https://picsum.photos/seed/cyber5/32/32',
      ]
    },
    {
      gameTitle: 'Wallpaper Engine',
      bannerUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/431960/header.jpg',
      playtime: '',
      lastPlayed: '',
      achievementsUnlocked: 5,
      achievementsTotal: 17,
      // UPDATED: Các icon thành tựu ngẫu nhiên và khác nhau
      achievementIcons: [
        'https://picsum.photos/seed/wp1/32/32',
        'https://picsum.photos/seed/wp2/32/32',
        'https://picsum.photos/seed/wp3/32/32',
        'https://picsum.photos/seed/wp4/32/32',
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  getAchievementProgress(unlocked: number, total: number): number {
    if (total === 0) {
      return 0;
    }
    return (unlocked / total) * 100;
  }
}