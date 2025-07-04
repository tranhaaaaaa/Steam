import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameInfor } from 'src/app/core/models/db.model';
import { GameService } from 'src/app/core/services/game.service';
import { ModalComponent } from "./modal/modal.component";

@Component({
  selector: 'app-community-header',
  imports: [CommonModule, ModalComponent],
  templateUrl: './community-header.component.html',
  styleUrl: './community-header.component.css'
})
export class CommunityHeaderComponent implements OnInit{
  public listGame : GameInfor[] = [] ;
  public game : GameInfor = new GameInfor();
  public gameId: number | null = null;


  constructor(private service : GameService){};
   isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }
onOpenGame(id: number) {
  this.gameId = id;
  this.isModalOpen = true;
}
  closeModal() {
    this.isModalOpen = false;
  }
  ngOnInit(): void {
  this.onGetData();
  }
  tabs: string[] = [
    'Tất cả',
    'Tranh ảnh',
    'Phát sóng',
    'Video',
    'Workshop',
    'Tin tức',
    'Hướng dẫn',
    'Đánh giá'
  ];

  selectedTab: string = 'Tất cả';
  onGetData(){
    this.service.getListGame().subscribe(res => {
      this.listGame = res.data;
      this.game = this.listGame[0];
      this.listGame = this.listGame.slice(1);
    })
  }
}
