import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Library } from 'src/app/core/models/db.model';
import { GameService } from 'src/app/core/services/game.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Component({
  selector: 'app-game-buyed',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './game-buyed.component.html',
  styleUrls: ['./game-buyed.component.css'] 
})
export class GameBuyedComponent implements OnInit {
  public listLibrary: Library[] = [];
  public userLogged = new UserLogged();

  // modal state
  public selectedGame?: Library;
  public isModalOpen = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData() {
    this.gameService.GameLibrary(this.userLogged.getCurrentUser().userId)
      .subscribe((data: any) => {
        this.listLibrary = data.data.Library;
      });
  }

  openModal(game: Library) {
    this.selectedGame = game;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedGame = undefined;
  }

  download(game: Library) {
    window.open(game.InstallerFilePath, '_blank');
  }
}
