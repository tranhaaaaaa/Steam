// src/app/modules/dashboard/pages/nft/nft.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nft } from '../../models/nft';

// Import các component cho phần giao diện GỐC
import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';
import { CategoryBrowserComponent } from '../../components/nft/category-browser/category-browser.component';
import { BecauseYouPlayedComponent } from '../../components/nft/because-you-played/because-you-played.component';
import { CommunityRecommendsComponent } from '../../components/nft/community-recommends/community-recommends.component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';

@Component({
  selector: 'app-nft',
  standalone: true,
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css'],
  // Cập nhật mảng imports để chứa TẤT CẢ component cần thiết
  imports: [
    CommonModule,
    // Components cho phần gốc
    NftDualCardComponent,
    NftSingleCardComponent,
    // Components cho phần mới
    NftHeaderComponent,
    CommunityRecommendsComponent,
    CategoryBrowserComponent,
    BecauseYouPlayedComponent,
    
  ],
})
export class NftComponent implements OnInit {
  // Thêm lại mảng dữ liệu 'nft'
  nft: Array<Nft>;

  constructor() {
    // Gán lại dữ liệu cho các card gốc
    this.nft = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        creator: 'Jhon Doe',
        instant_price: 4.222,
        price: 187.47,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.792,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.882,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];
  }

  ngOnInit(): void {}
}