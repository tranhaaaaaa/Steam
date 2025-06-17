import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, GameInfor } from 'src/app/core/models/db.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { GameService } from 'src/app/core/services/game.service';
interface Game {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
}
@Component({
  selector: 'app-list-game',
  imports: [CommonModule],
  templateUrl: './list-game.component.html',
  styleUrl: './list-game.component.css'
})
export class ListGameComponent implements OnInit {
  public listGame : GameInfor[] = [];
  public listCategory : Category[] = [];
  selectedTab: string = 'Tất cả';
  public tabTitles: string[] = [];
  constructor(private service : GameService,
    private router : Router,
    private cateService : CategoryService
  ){}
  ngOnInit(): void {
   this.onGetData();
  }
  onGetData(){
    this.cateService.getListCategory().subscribe(data => {
      this.listCategory = data.data;
      this.tabTitles = ['Tất cả', ...this.listCategory.map((category) => category.CategoryName)];
      this.service.getListGame().subscribe(data => {
       this.listGame = data.data;
    });
    })
    

  }
   onTabChange(tab: string): void {
    this.selectedTab = tab;
    switch (tab) {
      case 'Tất cả':
        this.listGame = this.listGame;
        break;
      case 'Hành động':
        this.listGame = this.listGame;
        break;
      case 'Phiêu lưu':
        this.listGame = this.listGame;
        break;
      case 'Kinh dị':
        this.listGame = this.listGame;
        break;
      default:
        this.listGame = this.listGame;
    }
  }
  
  

   onGameSelect(gameId: number) {
    this.router.navigate(['/dashboard/game-detail', gameId]); 
  }
}
