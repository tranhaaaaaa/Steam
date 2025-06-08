// src/app/modules/dashboard/pages/keyboards/keyboards.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface SteamKeyboard {
  id: number;
  title: string;
  image: string;
  points: number;
  itemTypeLabel: string;
}

@Component({
  selector: 'app-keyboards',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './keyboards.component.html',
  styleUrls: ['./keyboards.component.css']
})
export class KeyboardsComponent implements OnInit {

  keyboards: SteamKeyboard[] = [
    { id: 1, title: 'THẾ GIỚI SỐ', points: 5000, itemTypeLabel: 'Bàn phím Steam Deck', image: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/1675200/3f8729ef33b47be964cb2e1db9d92dacd934930f.png' },
    { id: 2, title: 'QUANG PHỔ', points: 5000, itemTypeLabel: 'Bàn phím Steam Deck', image: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/1675200/6fc636deb48fecc17369865ee1b37e0ea972778f.png' },
    { id: 3, title: 'HỒNG NGỌC', points: 5000, itemTypeLabel: 'Bàn phím Steam Deck', image: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/1675200/3eef6c39e46645c71a875a87be5553d2fb7249d3.png' },
    { id: 4, title: 'CHẤT CHƠI', points: 5000, itemTypeLabel: 'Bàn phím Steam Deck', image: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/1675200/3aeea35c2861fba63b59832f7938b7ce7b116ac2.png' },
    { id: 5, title: 'TÍM NHO', points: 5000, itemTypeLabel: 'Bàn phím Steam Deck', image: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/1675200/4943f6a4483a3bb4b1147342c2a6a9b0b535efd8.png' },
    { id: 6, title: 'XANH DA TRỜI', points: 5000, itemTypeLabel: 'Bàn phím Steam Deck', image: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/1675200/deb20b2b6f76e0ddc727aee45235aacb2d7aaa22.png' },
    { id: 7, title: 'XANH NGỌC', points: 5000, itemTypeLabel: 'Bàn phím Steam Deck', image: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/1675200/9c491ac88fb5b834453ce18e68c42cd0c99f60d2.png' },
    { id: 8, title: 'BÍ ĐỎ', points: 5000, itemTypeLabel: 'Bàn phím Steam Deck', image: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/1675200/9fb66ed0dc75448ff8147ee4bd5755d1506c8273.png' },
  ];


  constructor() { }

  ngOnInit(): void { }

  formatPoints(points: number): string {
    return points.toLocaleString('de-DE'); // Sử dụng 'de-DE' để có dấu chấm phân cách hàng nghìn
  }
}