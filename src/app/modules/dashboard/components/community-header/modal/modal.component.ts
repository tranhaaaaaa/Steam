import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameInfor } from 'src/app/core/models/db.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-modal',
  imports: [CommonModule,FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges {
  @Input() gameId: any;
  @Output() close = new EventEmitter<void>();
  game: GameInfor = new GameInfor();
newComment: string = '';
followDiscussion: boolean = false;
comments = [
  // Có thể là dữ liệu mẫu hoặc fetch từ API
  { user: 'Magnus', text: 'Đây là game hay nhất tôi từng chơi!' }
];
  constructor(private gameService: GameService) {}

  ngOnChanges(): void {
    if (this.gameId) {
      this.loadGameDetails();
    }
  }

  loadGameDetails() {
    this.gameService.getGameDetail(this.gameId).subscribe((res) => {
      this.game = res.data;
    });
  }

  onClose() {
    this.close.emit();
  }
  postComment() {
  if (this.newComment.trim()) {
    this.comments.push({
      user: 'Magnus', // Hoặc lấy từ auth
      text: this.newComment
    });
    this.newComment = '';
  }
}
}

