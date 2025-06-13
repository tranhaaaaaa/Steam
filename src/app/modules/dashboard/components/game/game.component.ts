import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameInfor } from 'src/app/core/models/db.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  accounts = [
    {
      id: 1,
      username: 'gamer123',
      email: 'gamer123@example.com',
      gameGenre: 'Action',
      status: 'active'
    },
    {
      id: 2,
      username: 'player456',
      email: 'player456@example.com',
      gameGenre: 'RPG',
      status: 'inactive'
    },
    {
      id: 3,
      username: 'warrior789',
      email: 'warrior789@example.com',
      gameGenre: 'Strategy',
      status: 'active'
    }
  ];

  constructor(private gameService : GameService,
    private router : Router
  ) {}
  public listGame : GameInfor[] = [];
  ngOnInit(): void {
    this.onGetData();
  }

  editAccount(account: any) {
   this.router.navigate([`/dashboard/detail/${account.Id}`])
  
  }
  onGetData(){
    this.gameService.getListGame().subscribe(data => {
      this.listGame = data.data;
      console.log(this.listGame);
    })
  }
  deleteAccount(accountId: number) {
    // Logic xóa tài khoản game
    this.accounts = this.accounts.filter(account => account.id !== accountId);
    console.log('Tài khoản đã được xóa:', accountId);
  }
}