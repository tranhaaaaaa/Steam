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


@Component({
  selector: 'app-nft',
  standalone: true,
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css'],
  imports: [
    CommonModule,
    FeaturedCarouselComponent,
    NftHeaderComponent,
    CommunityRecommendsComponent,
    CategoryBrowserComponent,
    BecauseYouPlayedComponent,
  ],
})
export class NftComponent implements OnInit {
  

  // Đặt là `true` để dùng dữ liệu giả, `false` để gọi API
  useMockData = true;// dùng để view tạm

  featuredGames: any[] = [];
  isLoading = true;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    if (this.useMockData) {
     
      this.featuredGames = this.getMockFeaturedGames();
      this.isLoading = false;
    } else {

      this.isLoading = true;
      this.gameService.getListGame().subscribe({
        next: (data) => {
          this.prepareFeaturedData(data.data);
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Failed to load games", err);
          this.isLoading = false;
        }
      });
    }
  }


  prepareFeaturedData(games: GameInfor[]): void {
    this.featuredGames = games.slice(0, 5).map(game => ({
      title: game.Title,
      mainImage: game.CoverImagePath,
      price: game.Price,
      originalPrice: game.Price * 2,
      discount: 50,
      thumbnails: [
        game.CoverImagePath,
        game.InstallerFilePath,
        game.CoverImagePath,
        game.InstallerFilePath,
      ].slice(0, 4)
    }));
  }

  getMockFeaturedGames(): any[] {
    return [
      {
        title: 'STAR WARS Jedi: Survivor™',
        mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1774580/header.jpg',
        price: 218000,
        originalPrice: 1090000,
        discount: 80,
        thumbnails: [
          'https://cdn.akamai.steamstatic.com/steam/apps/1774580/ss_994cb8786541381602496317124a63442d8f5963.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1774580/ss_48052285976752119344435980d2484435a2155c.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1774580/ss_270f9336495217e4933d5652935574dc5d3b0c51.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1774580/ss_ea350b5224cf3a085812a146351e345c6619b05c.600x338.jpg',
        ]
      },
      {
        title: 'Cyberpunk 2077',
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
      {
        title: 'Baldur\'s Gate 3',
        mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        price: 706500,
        originalPrice: 785000,
        discount: 10,
        thumbnails: [
          'https://cdn.akamai.steamstatic.com/steam/apps/1086940/ss_5b858798f7653e126d42iatb998a4d887e84360a.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1086940/ss_9a83363a3683ed3c434d2c722cb11b32a11475b3.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1086940/ss_84351ed3b67ce29155b4372035887a268ac5c29a.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1086940/ss_3da452f1897534f378c184a8677f8d308a3838a1.600x338.jpg',
        ]
      },
      {
        title: 'ELDEN RING',
        mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        price: 800000,
        originalPrice: 800000,
        discount: 0,
        thumbnails: [
          'https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_5a62f25979849a613589123c9100809b2391a74a.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_1204c65f09a2e45a3827539c753639e85a94595a.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_5033a8697241065346824d5a45b2144d99913ab9.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_97b7114a536377b2336357c789f66c7432e6584a.600x338.jpg',
        ]
      },
      {
        title: 'HELLDIVERS™ 2',
        mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/553850/header.jpg',
        price: 550000,
        originalPrice: 550000,
        discount: 0,
        thumbnails: [
          'https://cdn.akamai.steamstatic.com/steam/apps/553850/ss_a355f327754952de360fcd8a23a7b121251af5df.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/553850/ss_91f0417b38a730036d332e2e60f58af63372522e.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/553850/ss_e6133a2eb191a14101155981a3e01132f261fdd1.600x338.jpg',
          'https://cdn.akamai.steamstatic.com/steam/apps/553850/ss_75e9581f12a38a37b35a116f7c23310839176f4a.600x338.jpg',
        ]
      }
    ];
  }
}