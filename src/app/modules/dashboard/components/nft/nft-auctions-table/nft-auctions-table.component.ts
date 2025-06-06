import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Nft } from '../../../models/nft';
import { NftAuctionsTableItemComponent } from '../nft-auctions-table-item/nft-auctions-table-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[nft-auctions-table]',
  templateUrl: './nft-auctions-table.component.html',
  imports: [NgFor, FormsModule,CommonModule],
})
export class NftAuctionsTableComponent implements OnInit,AfterViewInit  {
  public activeAuction: Nft[] = [];
   @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  constructor() {
    this.activeAuction = [
      {
        id: 1346771,
        title: 'Cripto Cities',
        creator: 'Jenny Wilson',
        image:
          'https://lh3.googleusercontent.com/t_S1sM__cKCFbuhbwQ5JHKNRRggKuPH2O3FM_-1yOxJLRzz9VRMAPaVBibgrumZG3qsB1YxEuwvB7r9rl-F-gI6Km9NlfWhecfPS=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 43m 52s',
        last_bid: 22.0,
        price: 35330.9,
        instant_price: 22.0,
      },
      {
        id: 1346772,
        title: 'Lady Ape Club',
        creator: 'Jenny Wilson',
        image:
          'https://lh3.googleusercontent.com/k95IQpeYutx-lYXwgTZw0kXZl9GAkIOc4Yz3Dr06rndWphZ25kSWyF64aTqT3W4cOxz0eB5LfAss5i9WAR-ZPWVaifijsABLqzEYwHY=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '2h 00m 02s',
        last_bid: 2.8,
        price: 4812.72,
        instant_price: 2.9,
      },
      {
        id: 1346780,
        title: 'The King - Gordon Ryan',
        creator: 'Jenny Wilson',
        image:
          'https://lh3.googleusercontent.com/iYNxP1eXG3C6ujTY4REQ9rBea19Z46oKtKkaDS1XA-ED5iFhFmPrvQPzwx8ZwACydCS2wbZ7K1P89XIED3s8JRcT6Pn0M1-sMifeyQ=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 05m 00s',
        last_bid: 1.0,
        price: 1602.77,
        instant_price: 2.9,
      },
      {
        id: 1346792,
        title: 'Only by Shvembldr',
        creator: 'Jenny Wilson',
        image:
          'https://lh3.googleusercontent.com/ujFwzDIXN64mJAHZwZ0OgNupowe5jlJPmV8OIrgSDjUAeb3SZRuhsuyPKAw6S2TkUknZvErVVKbzD-rEcs-augb6_LzUE5NVtPxj_w=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 05m 00s',
        last_bid: 2.0,
        price: 1438.17,
        instant_price: 2.1,
      },
      {
        id: 1346792,
        title: 'Crypto Coven',
        creator: 'Jenny Wilson',
        image:
          'https://lh3.googleusercontent.com/pwjA4CWS9nto8fCis6JzlWwzQgtHUvLlUWcd501LsGQoVUPL5euwhir-2fjPmsJLJ_ovJ7flH_OgDEaALeZrhSXv8Puq85-lZYWuqto=h500',
        avatar: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-13.jpg',
        ending_in: '1h 05m 00s',
        last_bid: 0.8,
        price: 1278.38,
        instant_price: 0.35,
      },
    ];
  }

  ngOnInit(): void {}
   cardWidth = 280 + 24; // width + gap (1.5rem = 24px)

  ngAfterViewInit() {
    // Scroll ban đầu tới vị trí item đầu tiên (bỏ qua clone cuối lên đầu)
    this.carousel.nativeElement.scrollLeft = this.cardWidth;
  }

  scrollNext() {
    const el = this.carousel.nativeElement;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - this.cardWidth) {
      // Nếu scroll tới cuối clone, nhảy mượt về item đầu
      el.scrollTo({ left: this.cardWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: this.cardWidth, behavior: 'smooth' });
    }
  }

  scrollPrev() {
    const el = this.carousel.nativeElement;
    if (el.scrollLeft <= 0) {
      // Nếu scroll tới đầu clone, nhảy về cuối thực sự
      el.scrollTo({ left: el.scrollWidth - el.clientWidth - this.cardWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: -this.cardWidth, behavior: 'smooth' });
    }
  }

  onScroll() {
    const el = this.carousel.nativeElement;
    if (el.scrollLeft <= 0) {
      // Nếu scroll thủ công tới clone cuối (đầu)
      el.scrollLeft = el.scrollWidth - el.clientWidth - this.cardWidth;
    }
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
      // Nếu scroll thủ công tới clone đầu (cuối)
      el.scrollLeft = this.cardWidth;
    }
  }

}
