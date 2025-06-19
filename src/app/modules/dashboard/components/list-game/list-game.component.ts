import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, GameCategory, GameInfor } from 'src/app/core/models/db.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { GameService } from 'src/app/core/services/game.service';
import { GamecategoryService } from 'src/app/core/services/gamecategory.service';
interface Game {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
}
@Component({
  selector: 'app-list-game',
  imports: [CommonModule,FormsModule],
  templateUrl: './list-game.component.html',
  styleUrl: './list-game.component.css'
})
export class ListGameComponent implements OnInit {
  public listGame : GameInfor[] = [];
  public listCategory : Category[] = [];
  selectedTab: string = 'Tất cả';
   searchTerm: string = '';
  public tabTitles: string[] = [];
  cateName : any;
  public listGameOfCategory : GameCategory[] = [];
  constructor(private service : GameService,
    private router : Router,
    private cateService : CategoryService,
    private route : ActivatedRoute,
    private gameCategorySevice : GamecategoryService
  ){
    
  }
  ngOnInit(): void {
  this.onGetData();
}
onSearchChange() {
    if (this.searchTerm.trim() !== '') {
      this.listGameOfCategory = this.listGameOfCategory.filter(game => 
        game.GameName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.onGetData(); // Nếu ô tìm kiếm trống, reset lại danh sách game
    }
  }
onGetData() {
  this.route.paramMap.subscribe(params => {
    this.cateName = this.route.snapshot.paramMap.get('name');
    console.log(this.cateName);
    
    this.cateService.getListCategory().subscribe(data => {
      this.listCategory = data.data;

      // Cập nhật tabTitles và chọn tab tương ứng
      this.tabTitles = ['Tất cả', ...this.listCategory.map((category) => category.CategoryName)];
      if (this.cateName == 'Tất cả') {
          this.selectedTab = 'Tất cả'; 
         this.gameCategorySevice.getListGameCategory().subscribe(data => {
       this.listGameOfCategory = data.data;
      console.log("listGameOfCategory", this.listGameOfCategory);

    });
      
      } 
      else {
        this.selectedTab = this.cateName;
        this.gameCategorySevice.getListGameCategory().subscribe(data => {
      this.listGameOfCategory = data.data.filter((game: any) => game.CategoryName === this.cateName);
    });
      }
    });
  });
}

onTabChange(tab: string): void {
  this.selectedTab = tab;
  this.router.navigate(['/dashboard/list-game', tab]);
}


   onGameSelect(gameId: number) {
    this.router.navigate(['/dashboard/game-detail', gameId]); 
  }
}
