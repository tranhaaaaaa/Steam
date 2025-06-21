// src/app/modules/dashboard/pages/nft/nft.component.ts

import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nft } from '../../models/nft';

// Import các component cho phần giao diện GỐC
import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';
import { CategoryBrowserComponent } from '../../components/nft/category-browser/category-browser.component';
import { BecauseYouPlayedComponent } from '../../components/nft/because-you-played/because-you-played.component';
import { CommunityRecommendsComponent } from '../../components/nft/community-recommends/community-recommends.component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { TableComponent } from "../../../uikit/pages/table/table.component";
import { TableActionComponent } from 'src/app/modules/uikit/pages/table/components/table-action/table-action.component';
import { GameService } from 'src/app/core/services/game.service';
import { GameInfor } from 'src/app/core/models/db.model';

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
export class NftComponent {

  nft!: Array<Nft>;
  public listGame : GameInfor[] = [];
  constructor(private service : GameService) {
this.service.getListGame().subscribe((data)=>{
  this.listGame = data.data;
     this.nft = [
      {
        id: 34356771,
        title: this.listGame[0].Title,
        creator: 'Jhon Doe',
        instant_price: 4.222,
        price: this.listGame[0].Price,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: this.listGame[1].Title,
        price: this.listGame[1].Price,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: this.listGame[2].Title,
        price: this.listGame[2].Price,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];
})
 
  }

}