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
  createTitle : any;
  createImageUrl : any;
  file : any;
  createDescription : any;
  public userLogged = new UserLogged();
  public game : GameInfor = new GameInfor();
  public gameId: number | null = null;
   public currentPage: number = 1;
  public totalPages: number = 1;
  public itemsPerPage: number = 5; 
  currentPageThreads : Thread[] = [];
  public isModalOpen01 : boolean = false;
isLiked!: false
  constructor(private service : GameService,
    private storeService : ThreadService,
    private toastService : ToastrService,
    private threadService: ThreadService
  ){};
   isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }   
  likePost(id: number) {
        this.isLiked = this.isLiked; // Đảo ngược trạng thái LIKE
        // Bạn có thể thêm logic để lưu lại trạng thái LIKE vào cơ sở dữ liệu nếu cần
    }
    changePage(page: number): void {
  if (page > 0 && page <= this.totalPages) {
    this.currentPage = page;
    this.paginateThreads(); // Recalculate which threads to show for the current page
  }
}

onOpenGame(id: number) {
  this.gameId = id;
  this.isModalOpen = true;
}
  closeModal() {
    this.isModalOpen = false;
  }
  onCreatePostModal() {
    
    if(this.createDescription == null || this.createDescription == undefined || this.createDescription == '' || this.createTitle == null || this.createTitle == undefined || this.createTitle == '')
      {
        this.toastService.warning("Vui lòng nhập đầy đủ thông tin!");
       
      }
      else{
        // let formData = {
        //   Id : 12,
        //    ThreadTitle : this.title,
        //     ThreadDescription : this.description,
        //     ThreadImageUrl : 'aaaaaaaa',
        //     UpvoteCount : 0,
        //     CreatedAt: new Date(),
        //     imageFile : this.file,
        //     CreatedBy : this.userLogged.getCurrentUser().userId,
        // }
        // debugger
          let formData = new FormData();
              formData.append('Id', '12');
              formData.append('ThreadTitle', this.createTitle);
              formData.append('ThreadDescription', this.createDescription);
              formData.append('ThreadImageUrl', 'aaaaaaaa');
              formData.append('UpvoteCount', '0');
              formData.append('CreatedAt', '2025-1-1');
              formData.append('imageFile', this.file); 
              formData.append('CreatedBy', this.userLogged.getCurrentUser().userId);
        console.log("formData",formData);
        this.storeService.addThread(formData).subscribe(res => {
          this.toastService.success("Thêm bài viết thành công!","Thành công");
          this.onGetData();
          this.isModalOpen01 = false;
        })
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

  onSubmit(){
    let formData = new FormData()
    formData.append('Id', '12');
    formData.append('ThreadTitle', this.title);
    formData.append('ThreadDescription', this.description);
    formData.append('ThreadImageUrl', 'aaaaaaaa');
    formData.append('UpvoteCount', '0');
    formData.append('CreatedAt', '2025-1-1');
    formData.append('imageFile', this.file); 
    formData.append('CreatedBy', this.userLogged.getCurrentUser().userId);
    // let formData = {
    //   ThreadTitle : this.title,
    //   ThreadDescription : this.description,
    //   ThreadImageUrl : this.createImageUrl,
    //   UpvoteCount : 0,
    //   CreatedAt: new Date(),
    //   CreatedBy : this.userLogged.getCurrentUser().userId,
    //}
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
 onGetData(): void {
  this.storeService.getListThread().subscribe(res => {
    this.listThread = res.data.reverse(); // All the threads
    this.totalPages = Math.ceil(this.listThread.length / this.itemsPerPage); // Calculate total pages
    this.paginateThreads(); // Call pagination method to display correct threads based on currentPage
  });
}

// Paginate the threads based on current page
paginateThreads(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.currentPageThreads = this.listThread.slice(startIndex, endIndex); // Show paginated threads
}

  openCreatePostModal() {
    this.isModalOpen01 = true;
  }
like(threadid: any){
  let formData = {
    threadID : threadid,
    userId : this.userLogged.getCurrentUser().userId,
    createdAt : new Date()
  }
  this.threadService.addThreadUpvote(formData).subscribe(res => {
    this.toastService.success("Thích bài viết","Thành công");
    this.onGetData();
  })
}

  IscloseModal() {
    this.isModalOpen01 = false;
  }
}
