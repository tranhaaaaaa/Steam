// src/app/modules/dashboard/pages/product-detail/product-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  game = {
    title: 'Lies of P',
    description: 'Lies of P is a thrilling soulslike that takes the story of Pinocchio, turns it on its head, and sets it against the darkly elegant backdrop of the Belle Epoque era.',
    mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/header.jpg?t=1701916187',
    media: [
      { type: 'video', url: 'https://cdn.akamai.steamstatic.com/steam/apps/256923857/movie_max_vp9.webm?t=1701916187' },
      { type: 'image', url: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/ss_0a93756b553b4481f084666359b37849c7cc72f1.600x338.jpg' },
      { type: 'image', url: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/ss_d830f3a38f712757271b86c8782705a221d1193d.600x338.jpg' },
      { type: 'image', url: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/ss_8f0b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b.600x338.jpg' },
    ],
    tags: ['Dark Souls', 'Hành động', 'Kỳ ảo u ám', 'Đen tối'],
    reviews: {
      recent: 'Rất tích cực',
      recentCount: '1,709',
      all: 'Rất tích cực',
      allCount: '39,594'
    },
    releaseDate: '18 Thg09, 2023',
    developer: 'NEOWIZ',
    publisher: 'NEOWIZ',
    price: '525.000₫',
    discount: -50,
    originalPrice: '1.050.000₫'
  };

  constructor() { }

  ngOnInit(): void { }
}