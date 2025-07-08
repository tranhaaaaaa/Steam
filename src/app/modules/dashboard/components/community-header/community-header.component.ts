import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameInfor, Thread, ThreadReply } from 'src/app/core/models/db.model';
import { GameService } from 'src/app/core/services/game.service';
import { ModalComponent } from "./modal/modal.component";
import { ThreadService } from 'src/app/core/services/thread.service';
import { FormsModule } from '@angular/forms';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-community-header',
  imports: [CommonModule,ModalComponent,FormsModule],
  templateUrl: './community-header.component.html',
  styleUrl: './community-header.component.css'
})
export class CommunityHeaderComponent implements OnInit{
  public listGame : GameInfor[] = [] ;
  public listThread : Thread[] = [];
  title: any;
  description: any;
  listThreadReply: ThreadReply[] = [];
  
  public userLogged = new UserLogged();
  public game : GameInfor = new GameInfor();
  public gameId: number | null = null;
  public isModalOpen01 : boolean = false;

  constructor(private service : GameService,
    private storeService : ThreadService,
    private toastService : ToastrService
  ){};
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
  onSubmit(){
    console.log(this.title);
    console.log(this.description);
    let formData = {
      threadTitle : this.title,
      threadDescription : this.description,
      createdBy : this.userLogged.getCurrentUser().userId,
    }
    this.storeService.addThread(formData).subscribe(res => {
      this.toastService.success("Thêm bài viết thành công!","Thành công");
      this.onGetData();
      this.IscloseModal();
    })
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
    this.storeService.getListThread().subscribe(res => {
      this.listThread = res.data.reverse();
      
    })
    // this.storeService.
  }
  openCreatePostModal() {
    this.isModalOpen01 = true;
  }


  IscloseModal() {
    this.isModalOpen01 = false;
  }
}
