
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/db.model';

interface Category1 {
  name: string;
  backgroundImage: string;
}

@Component({
  selector: 'app-category-browser',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.css']
})
export class CategoryBrowserComponent implements OnInit {
  public listMapCategory : Array<any> =[];
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  categories: Category1[] = [
    { name: 'ACTION', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/category/rpg?cc=us&l=english' },
    { name: 'FIGHTING', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/vr?cc=us&l=english' },
    { name: 'ROGUE-LIKE', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/category/racing?cc=us&l=english' },
    { name: 'SIMULATION', backgroundImage: 'https://store.akamai.steamstatic.com/public/images/v6/sim/game_spotlight_image_sim.jpg' },
    { name: 'STRATEGY', backgroundImage: 'https://store.akamai.steamstatic.com/public/images/v6/strategy/game_spotlight_image_strategy.jpg' },
    { name: 'RPG', backgroundImage: 'https://store.akamai.steamstatic.com/public/images/v6/rpg/game_spotlight_image_rpg.jpg' },
  ];

  constructor(private service : CategoryService) { }
  public listCategory : Category[]=[];
  ngOnInit(): void {
    this.onGetData();
   }
  onGetData(){
   this.service.getListCategory().subscribe((data) => {
    this.listCategory = data.data;  // Lấy danh sách category từ server

    // Mảng các ảnh tương ứng với tên
    const categoryImages = [
      { name: 'RPG', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/category/rpg?cc=us&l=english' },
      { name: 'FPS', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/category/horror?cc=us&l=vietnamese' },
      { name: 'Puzzle', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/category/racing?cc=us&l=english' },
      { name: 'Simulation', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/category/horror?cc=us&l=vietnamese' },
      { name: 'Horror', backgroundImage: 'https://store.fastly.steamstatic.com/categories/homepageimage/category/horror?cc=us&l=vietnamese' },
    ];

    // Ánh xạ tên từ `listCategory` với ảnh trong `categoryImages`
    this.categories = this.listCategory.map((element) => {
      // Tìm ảnh tương ứng với tên của category
      const matchedCategory = categoryImages.find((category) => category.name === element.CategoryName);
      
      // Trả về đối tượng với name và backgroundImage
      return {
        name: element.CategoryName,
        backgroundImage: matchedCategory ? matchedCategory.backgroundImage : 'https://store.fastly.steamstatic.com/categories/homepageimage/category/horror?cc=us&l=vietnamese'
      };
    });
    
    console.log(this.categories); 
  })
  }
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