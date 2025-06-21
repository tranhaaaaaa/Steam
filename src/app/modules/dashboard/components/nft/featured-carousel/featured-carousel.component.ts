
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.css']
})
export class FeaturedCarouselComponent implements OnInit, OnDestroy {
  @Input() games: any[] = [];
  
  currentIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    // Dọn dẹp interval khi component bị hủy để tránh memory leak
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Tự động chuyển slide sau mỗi 5 giây
  }

  resetInterval(): void {
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }

  prevSlide(): void {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.games.length - 1;
    this.resetInterval();
  }

  nextSlide(): void {
    this.currentIndex = this.currentIndex < this.games.length - 1 ? this.currentIndex + 1 : 0;
    this.resetInterval();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.resetInterval();
  }
}