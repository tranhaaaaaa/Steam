import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameInfor } from 'src/app/core/models/db.model';
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
  selectedTab: string = 'Tất cả';
  constructor(private service : GameService,
    private router : Router
  ){}
  ngOnInit(): void {
   this.onGetData();
  }
  onGetData(){
    this.service.getListGame().subscribe(data => {
       this.listGame = data.data;
      console.log(this.listGame);
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
  
  tabTitles = ['Tất cả', 'Hành động', 'Phiêu lưu', 'Kinh dị'];

   onGameSelect(gameId: number) {
    this.router.navigate(['/dashboard/game-detail', gameId]); 
  }
}
