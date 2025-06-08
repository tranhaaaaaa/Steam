// src/app/modules/dashboard/components/community-recommends/community-recommends.component.ts
// (Giả sử bạn đã đổi tên file thành community-recommends.component.ts)

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CommunityRecommendation {
  id: number;
  title: string;
  mainImage: string;
  description: string;
  tags: string[];
  review: {
    text: string;
    avatar: string;
    author: string;
  };
}

@Component({
  // SỬA LẠI SELECTOR: Bỏ dấu ngoặc vuông để nó trở thành một element selector
  selector: 'app-community-recommends', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-recommends.component.html',
  styleUrls: ['./community-recommends.component.css'] 
})
// SỬA LẠI TÊN CLASS: Thêm 's' vào cuối
export class CommunityRecommendsComponent implements OnInit, AfterViewInit {

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  recommendations: CommunityRecommendation[] = [
    {
      id: 1,
      title: 'Wuthering Waves',
      mainImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3513350/e2dae6095f417d6c613cc01ba0ed4d10c3ec2a27/capsule_616x353.jpg?t=1746670477',
      description: 'A promising Open-World ARPG with a fluid, fast-paced combat system and a compelling story. A must-try for fans of the genre.',
      tags: ['Open World', 'Action RPG', 'Anime', 'Gacha'],
      review: {
        text: 'This is a promising Open-World ARPG with a fluid, fast-paced combat system and a compelling story. The gacha system is fair, and the world is beautiful to explore. Highly recommended!',
        avatar: 'https://avatars.akamai.steamstatic.com/6a0a9750d695f3f9f5c5d5e5f5d5e5f5d5e5f5d5_medium.jpg',
        author: 'DarkHollow'
      }
    },
    {
      id: 2,
      title: 'Palworld',
      mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
      description: 'An unexpected hit combining monster-catching with survival and crafting. It\'s chaotic, fun, and surprisingly deep.',
      tags: ['Open World', 'Survival', 'Crafting', 'Multiplayer'],
      review: {
        text: 'Pokemon with guns! What more could you ask for? The game is incredibly addictive and offers endless hours of fun with friends. The base building and crafting systems are top-notch.',
        avatar: 'https://avatars.akamai.steamstatic.com/f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1_medium.jpg',
        author: 'GamerX'
      }
    },
    {
      id: 3,
      title: 'HELLDIVERS™ 2',
      mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/553850/header.jpg',
      description: 'A thrilling cooperative third-person shooter. Spread democracy across the galaxy with overwhelming firepower!',
      tags: ['Co-op', 'Third-Person Shooter', 'Sci-Fi', 'Action'],
      review: {
        text: 'For Super Earth! This game is pure, unadulterated fun. The feeling of calling in an orbital strike on a horde of giant bugs is unmatched. A must-play with friends.',
        avatar: 'https://avatars.akamai.steamstatic.com/e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3_medium.jpg',
        author: 'LibertyPrime'
      }
    },
    {
      id: 4,
      title: 'Stardew Valley',
      mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg',
      description: 'The ultimate farming and life simulation game. Escape to the countryside and build a new life.',
      tags: ['Farming Sim', 'Life Sim', 'Pixel Graphics', 'Relaxing'],
      review: {
        text: 'The perfect game to unwind after a long day. There\'s always something to do, whether it\'s farming, fishing, mining, or building relationships with the townsfolk. A true masterpiece.',
        avatar: 'https://avatars.akamai.steamstatic.com/d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2_medium.jpg',
        author: 'CozyGamer'
      }
    }
  ];

  constructor() { }

  ngOnInit(): void { }
  
  ngAfterViewInit(): void { }

  scroll(direction: 'left' | 'right'): void {
    if (this.carousel) {
      const scrollAmount = this.carousel.nativeElement.clientWidth * 0.8;
      this.carousel.nativeElement.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}