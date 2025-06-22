
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from 'src/app/core/services/game.service';
import { GameInfor } from 'src/app/core/models/db.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-carousel',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.css']
})
export class FeaturedCarouselComponent implements OnInit, OnDestroy {
  @Input() games: any[] = [];
  
  currentIndex = 0;
  public listGame : GameInfor[] = []
  private intervalId: any;
  constructor(private gameService : GameService) { }
  ngOnInit(): void {
    this.startAutoSlide();
    this.gameService.getListGame().subscribe(data => {
      this.listGame = data.data;
    })
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