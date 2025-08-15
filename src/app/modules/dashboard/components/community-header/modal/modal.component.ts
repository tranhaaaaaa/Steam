import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
file: any;
public userLogged = new UserLogged();
public listReply : ThreadReply[] = [];
followDiscussion: boolean = false;

  constructor(private gameService: GameService,
    private threadService : ThreadService,
    private toastService : ToastrService
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
      let form = new FormData();
      form.append('threadComment', this.newComment);
      form.append('upvoteCount', this.starRating.toString());
      form.append('createdBy', this.userLogged.getCurrentUser().userId.toString());
      form.append('threadID', this.gameId.toString());
      form.append('imageFile', this.file);
      // let form = {
      //   threadComment : this.newComment,
      //   upvoteCount : this.starRating,
      //   createdBy : this.userLogged.getCurrentUser().userId,
      //   threadID : this.gameId
      // }
        this.threadService.addThreadReply(form).subscribe((res) => {
          
          let formData = {
            userId : this.userLogged.getCurrentUser().userId,
            threadID : res.data.id,
            createdAt: new Date()
          }
          this.threadService.addThreadUpvote(formData).subscribe((res) => {
            
          })
          this.loadGameDetails();
        })
      this.newComment = ''; 
      this.starRating = 5;  
    }
  }
  fileChange(event: any) {
  if (event.target.files.length) {
      
    const fileAllow = '.png,.jpg,.mp4'; // Allowed file extensions
    const sizeFileAllow = '10'; // Max file size in MB

    const arrayFileAllow = fileAllow.toLowerCase().split(',');

    // Lấy tệp đầu tiên được chọn
    const file = event.target.files[0];
    const fileExtension = `.${file.name.split('.').pop()}`;

    // Kiểm tra phần mở rộng tệp
    if (!arrayFileAllow.includes(fileExtension.toLowerCase())) {
      this.toastService.warning('Loại file không được hỗ trợ. Chỉ chấp nhận .png, .jpg, hoặc .mp4.');
      return;
    }

    // Kiểm tra kích thước tệp
    const maxSizeInBytes = parseInt(sizeFileAllow) * 1024 * 1024; // Convert MB to Bytes
    if (file.size > maxSizeInBytes) {
      this.toastService.warning('Dung lượng file quá lớn. Vui lòng chọn tệp nhỏ hơn 10MB.');
      return;
    }

    // Nếu tệp hợp lệ, gán vào createImageUrl
    this.file = event.target.files[0];

  } else {
    this.toastService.warning('Vui lòng chọn tệp.');
  }
}
}

