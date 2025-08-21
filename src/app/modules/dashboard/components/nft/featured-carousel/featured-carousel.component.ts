// src/app/modules/dashboard/components/nft/featured-carousel/featured-carousel.component.ts

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Giữ lại import này

@Component({
  selector: 'app-featured-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink], // Giữ lại RouterLink ở đây
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.css']
})
export class FeaturedCarouselComponent implements OnInit, OnDestroy {
  // Chỉ giữ lại @Input() để nhận dữ liệu từ component cha.
  // Component này không cần biết GameService là gì.
  @Input() games: any[] = []; 
  
  currentIndex = 0;
  private intervalId: any;

  // Xóa GameService khỏi constructor
  constructor() { } 

  ngOnInit(): void {
    console.log("game featured",this.games);
    // Chỉ bắt đầu auto-slide khi có dữ liệu được truyền vào
    if (this.games.length > 0) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetInterval(): void {
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }

  prevSlide(): void {
    if (this.games.length === 0) return; // Bảo vệ chống lỗi khi mảng rỗng
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.games.length - 1;
    this.resetInterval();
  }

  nextSlide(): void {
    if (this.games.length === 0) return; // Bảo vệ chống lỗi khi mảng rỗng
    this.currentIndex = this.currentIndex < this.games.length - 1 ? this.currentIndex + 1 : 0;
    this.resetInterval();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.resetInterval();
  }
}