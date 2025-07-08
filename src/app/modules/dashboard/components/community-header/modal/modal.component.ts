import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameInfor, Thread, ThreadReply } from 'src/app/core/models/db.model';
import { GameService } from 'src/app/core/services/game.service';
import { ThreadService } from 'src/app/core/services/thread.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Component({
  selector: 'app-modal',
  imports: [CommonModule,FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges {
  @Input() gameId: any;
  starRating: number = 5;
  @Output() close = new EventEmitter<void>();
  game: Thread = new Thread();
newComment: string = '';
totalstars: number = 0;
public userLogged = new UserLogged();
public listReply : ThreadReply[] = [];
followDiscussion: boolean = false;

  constructor(private gameService: GameService,
    private threadService : ThreadService,
  ) {}
getStars(upvoteCount: number): number[] {
    return new Array(upvoteCount).fill(0);
  }

  getEmptyStars(upvoteCount: number): number[] {
    return new Array(5 - upvoteCount).fill(0);
  }

 setStarRating(rating: number): void {
    this.starRating = rating;
  }

  ngOnChanges(): void {
    if (this.gameId) {
      this.loadGameDetails();
    }
  }

  loadGameDetails() {

    this.threadService.GetThreadId(this.gameId).subscribe((res) => {
      this.game = res.data;
    })
    this.threadService.getListThreadReply(this.gameId).subscribe((res) => {
      this.listReply = res.data.reverse();
      let x = 0;
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        x += element.UpvoteCount;
      }

      if (this.listReply.length > 0) {
        this.totalstars = x / this.listReply.length;
      } else {
        this.totalstars = 0; 
      }
    
    });
  }

  onClose() {
    this.close.emit();
  }
 sendComment() {
    if (this.newComment.trim()) {
      let form = {
        threadComment : this.newComment,
        upvoteCount : this.starRating,
        createdBy : this.userLogged.getCurrentUser().userId,
        threadID : this.gameId
      }
        this.threadService.addThreadReply(form).subscribe((res) => {
          console.log(res);
          this.loadGameDetails();
        })
      this.newComment = ''; 
      this.starRating = 5;  
    }
  }
  
}

