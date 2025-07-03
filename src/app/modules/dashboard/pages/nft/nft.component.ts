// src/app/modules/dashboard/pages/nft/nft.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from 'src/app/core/services/game.service';
import { GameInfor } from 'src/app/core/models/db.model';

// Import các component cần thiết cho trang
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { CommunityRecommendsComponent } from '../../components/nft/community-recommends/community-recommends.component';
import { CategoryBrowserComponent } from '../../components/nft/category-browser/category-browser.component';
import { BecauseYouPlayedComponent } from '../../components/nft/because-you-played/because-you-played.component';
import { FeaturedCarouselComponent } from '../../components/nft/featured-carousel/featured-carousel.component';
import { SpecialOffersComponent } from '../../components/special-offers/special-offers.component'; // Import component mới

@Component({
  selector: 'app-nft',
  standalone: true,
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css'],
  imports: [
    CommonModule,
    FeaturedCarouselComponent,
    SpecialOffersComponent, // Thêm component mới vào imports
    NftHeaderComponent,
    CommunityRecommendsComponent,
    CategoryBrowserComponent,
    BecauseYouPlayedComponent,
  ],
})
export class NftComponent implements OnInit {

  useMockData = true;

  featuredGames: any[] = [];
  specialOfferGames: any[] = []; // Mảng cho ưu đãi đặc biệt
  isLoading = true;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    if (this.useMockData) {
      // Nếu dùng dữ liệu giả, gọi các hàm getMock...()
      this.featuredGames = this.getMockFeaturedGames();
      this.specialOfferGames = this.getMockSpecialOfferGames();
      this.isLoading = false;
    } else {
      // Nếu không, gọi API để lấy dữ liệu thật
      this.isLoading = true;
      this.gameService.getListGame().subscribe({
        next: (data) => {
          // Xử lý và chuẩn bị dữ liệu từ API
          this.prepareFeaturedData(data.data);
          this.prepareSpecialOffersData(data.data);
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Failed to load games from API", err);
          this.isLoading = false;
        }
      });
    }
  }

  prepareFeaturedData(games: GameInfor[]): void {
    // Lấy 5 game đầu tiên làm ví dụ
    this.featuredGames = games.slice(0, 5).map(game => ({
      id: game.Id,
      title: game.Title,
      description: game.Description,
      mainImage: game.CoverImagePath,
      price: game.Price, // Cần tính giá sau giảm giá nếu có
      originalPrice: game.Price,
      discount: game.DiscountPercent || 0,
      thumbnails: this.parseMediaUrls(game.MediaUrls).slice(0, 4)
    }));
  }


  prepareSpecialOffersData(games: GameInfor[]): void {
    
    this.specialOfferGames = games.filter(g => g.DiscountPercent > 0).map(game => ({
        id: game.Id,
        title: game.Title,
        mainImage: game.CoverImagePath,
        price: game.Price, // Cần tính giá sau giảm giá
        originalPrice: game.Price,
        discount: game.DiscountPercent
    }));
  }


  parseMediaUrls(mediaUrlsString: string): string[] {
    try {
        const urls = JSON.parse(mediaUrlsString);
        return Array.isArray(urls) ? urls : [];
    } catch (e) {
        return (mediaUrlsString || '').split(',').map(url => url.trim()).filter(url => url);
    }
  }


  getMockFeaturedGames(): any[] {
    return [
      {
        id: 1,
        title: 'Black Myth: Wukong',
        description: 'Black Myth: Wukong is an action RPG rooted in Chinese mythology. The story is based on Journey to the West, one of the Four Great Classical Novels of Chinese literature.',
        mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1818450/header.jpg',
        price: 800000,
        originalPrice: 800000,
        discount: 0,
        thumbnails: [
          'https://cdn.akamai.steamstatic.com/steam/apps/1818450/ss_a58590547b8c2813155805470686d108231a3f2b.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1818450/ss_891b824334c99ff0d85303e1723708569854707e.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1818450/ss_924751453479b769c109756b1c58197d1901a24b.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1818450/ss_022374c4314488b3f7d33380a9b88b1931f61cb7.600x338.jpg',
        ]
      },
      {
        id: 2,
        title: 'Cyberpunk 2077',
        description: 'An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.',
        mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
        price: 495000,
        originalPrice: 990000,
        discount: 50,
        thumbnails: [
          'https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_13963132338d3f60434558564a434a5333857185.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_b846c1b9a1001189e5574136658f761416127475.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_a553a06deea3b6428a388f6f55de6aaf23e59513.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_a31e6465243653155541617e5438a0a1e04235fa.600x338.jpg',
        ]
      },
    ];
  }

  // HÀM CUNG CẤP DỮ LIỆU GIẢ CHO LƯỚI "ƯU ĐÃI ĐẶC BIỆT"
  getMockSpecialOfferGames(): any[] {
    return [
      { id: 2, title: 'ARA: History Untold', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2021880/header.jpg', price: 430000, originalPrice: 430000, discount: 0 },
      { id: 3, title: 'gogh', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2098280/header.jpg', price: 136000, originalPrice: 170000, discount: 20 },
      { id: 4, title: 'Soundpad', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/629520/header.jpg', price: 59000, originalPrice: 73500, discount: 20 },
      { id: 5, title: 'PANICORE', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/25Panic0/header.jpg', price: 49000, originalPrice: 49000, discount: 0 },
      { id: 6, title: 'Five Hearts Under One Roof', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2845760/header.jpg', price: 182000, originalPrice: 260000, discount: 30 },
      { id: 7, title: 'FINAL FANTASY XVI', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2722010/header.jpg', price: 812000, originalPrice: 1249000, discount: 35 },
      { id: 8, title: 'LEGO® Star Wars™: The Skywalker Saga', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/920210/header.jpg', price: 123500, originalPrice: 822000, discount: 85 },
      { id: 9, title: 'Breaker', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2988760/header.jpg', price: 308000, originalPrice: 385000, discount: 20 },
      { id: 10, title: 'Mafia: Definitive Edition', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1030840/header.jpg', price: 104500, originalPrice: 698000, discount: 85 },
      { id: 11, title: 'PICO PARK 2', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/2932920/header.jpg', price: 91000, originalPrice: 130000, discount: 30 },
      { id: 12, title: 'PAYDAY 3', mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1272080/header.jpg', price: 150000, originalPrice: 500000, discount: 70 },
    ];
  }
}