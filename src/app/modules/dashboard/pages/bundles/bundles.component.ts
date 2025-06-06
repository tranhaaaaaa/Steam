// src/app/modules/dashboard/pages/bundles/bundles.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface Bundle {
  id: number;
  title: string;
  itemCount: number;
  gameIcon: string;
  bundleImage: string;
  discountPercentage: number;
  points: number;
}

@Component({
  selector: 'app-bundles',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.css']
})
export class BundlesComponent implements OnInit {

   bundles: Bundle[] = [
    { id: 1, title: 'SPRING SALE 2025 COMPLETE ITEM BUNDLE', itemCount: 15, gameIcon: 'https://picsum.photos/id/10/50/50', bundleImage: 'https://picsum.photos/id/101/600/250', discountPercentage: 10, points: 17100 },
    { id: 2, title: 'WINTER SALE 2024 COMPLETE ITEM BUNDLE', itemCount: 33, gameIcon: 'https://picsum.photos/id/11/50/50', bundleImage: 'https://picsum.photos/id/102/600/250', discountPercentage: 10, points: 31500 },
    { id: 3, title: 'COUNTER-STRIKE 2 COMPLETE ITEM BUNDLE', itemCount: 28, gameIcon: 'https://picsum.photos/id/12/50/50', bundleImage: 'https://picsum.photos/id/103/600/250', discountPercentage: 10, points: 21240 },
    { id: 4, title: 'SPRING SALE 2024 COMPLETE ITEM BUNDLE', itemCount: 17, gameIcon: 'https://picsum.photos/id/13/50/50', bundleImage: 'https://picsum.photos/id/104/600/250', discountPercentage: 10, points: 22500 },
    { id: 5, title: 'HALLOWEEN SALE 2021 COMPLETE ITEM BUNDLE', itemCount: 10, gameIcon: 'https://picsum.photos/id/14/50/50', bundleImage: 'https://picsum.photos/id/105/600/250', discountPercentage: 10, points: 33300 },
    { id: 6, title: 'SUMMER IN THE CITY COMPLETE ITEM BUNDLE', itemCount: 12, gameIcon: 'https://picsum.photos/id/15/50/50', bundleImage: 'https://picsum.photos/id/106/600/250', discountPercentage: 10, points: 41040 },
    { id: 7, title: 'TEAM FORTRESS 2 COMPLETE ITEM BUNDLE', itemCount: 35, gameIcon: 'https://picsum.photos/id/16/50/50', bundleImage: 'https://picsum.photos/id/107/600/250', discountPercentage: 20, points: 18640 },
    { id: 8, title: 'SUMMER SALE 2023 COMPLETE ITEM BUNDLE', itemCount: 12, gameIcon: 'https://picsum.photos/id/17/50/50', bundleImage: 'https://picsum.photos/id/108/600/250', discountPercentage: 10, points: 30690 },
    { id: 9, title: 'STEAM SCREAM 2024 COMPLETE ITEM BUNDLE', itemCount: 10, gameIcon: 'https://picsum.photos/id/18/50/50', bundleImage: 'https://picsum.photos/id/109/600/250', discountPercentage: 10, points: 15300 },
    { id: 10, title: 'AUTUMN SALE 2024 COMPLETE ITEM BUNDLE', itemCount: 12, gameIcon: 'https://picsum.photos/id/19/50/50', bundleImage: 'https://picsum.photos/id/110/600/250', discountPercentage: 10, points: 24300 },
    { id: 11, title: 'LEFT 4 DEAD 2 COMPLETE ITEM BUNDLE', itemCount: 10, gameIcon: 'https://picsum.photos/id/20/50/50', bundleImage: 'https://picsum.photos/id/111/600/250', discountPercentage: 10, points: 2700 },
    { id: 12, title: 'PORTAL 2 COMPLETE ITEM BUNDLE', itemCount: 16, gameIcon: 'https://picsum.photos/id/21/50/50', bundleImage: 'https://picsum.photos/id/112/600/250', discountPercentage: 20, points: 12160 },
  ];


  constructor() { }

  ngOnInit(): void { }

  formatPoints(points: number): string {
    return points.toLocaleString();
  }
}