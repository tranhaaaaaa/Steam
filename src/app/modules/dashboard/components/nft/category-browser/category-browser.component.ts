
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Category {
  name: string;
  backgroundImage: string;
}

@Component({
  selector: 'app-category-browser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.css']
})
export class CategoryBrowserComponent implements OnInit {

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  categories: Category[] = [
    { name: 'ACTION', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/category/rpg?cc=us&l=english' },
    { name: 'FIGHTING', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/vr?cc=us&l=english' },
    { name: 'ROGUE-LIKE', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/category/racing?cc=us&l=english' },
    { name: 'SIMULATION', backgroundImage: 'https://store.akamai.steamstatic.com/public/images/v6/sim/game_spotlight_image_sim.jpg' },
    { name: 'STRATEGY', backgroundImage: 'https://store.akamai.steamstatic.com/public/images/v6/strategy/game_spotlight_image_strategy.jpg' },
    { name: 'RPG', backgroundImage: 'https://store.akamai.steamstatic.com/public/images/v6/rpg/game_spotlight_image_rpg.jpg' },
  ];

  constructor() { }

  ngOnInit(): void { }

  scroll(direction: 'left' | 'right'): void {
    if (this.carousel) {
      const scrollAmount = this.carousel.nativeElement.clientWidth;
      this.carousel.nativeElement.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}