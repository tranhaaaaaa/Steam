
import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category, Discount, GameInfor, Tag } from 'src/app/core/models/db.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { GameService } from 'src/app/core/services/game.service';
import { GamecategoryService } from 'src/app/core/services/gamecategory.service';
import { UserLogged } from 'src/app/core/utils/userLogged';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TagsService } from 'src/app/core/services/tags.service';
export interface FileWithMediaURL {
  file: File;
  mediaURL: string;
}
@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatFormFieldModule, MatSelectModule],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  gameForm!: FormGroup;
  public listDiscount : Discount[] = []
  listCategory: Category[] = [];
  idgame: any;
    file: any = '';
   tagSelected: number[] = []; 
    public fileUpload: any;
  userLogged = new UserLogged();
 listHashtags = ['Hành Động', 'Phiêu Lưu', 'Kinh Dị', 'Chiến Thuật', 'Indie', 'VR', 'Online', 'Offline'];
  // Các thuộc tính cần thiết cho giao diện "làm đẹp"
  pageTitle = 'Đang tải...';
   fruits = [
    { value: 'apple', name: 'Táo' },
    { value: 'banana', name: 'Chuối' },
    { value: 'orange', name: 'Cam' },
    { value: 'grapes', name: 'Nho' },
    { value: 'pineapple', name: 'Dứa' }
  ];
  isLoading = true;
  isSaving = false;
  public  game : GameInfor = new GameInfor();
   selectedFruits: number[] = [];
  public discountId : any;
uploadedFiles: FileWithMediaURL[] = [];
public listTags : Tag[] = [];
  constructor(
    private gameService: GameService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastService: ToastrService,
    private gameCategoryService: GamecategoryService,
    private router: Router,
    private tagService : TagsService,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // Khởi tạo form với tất cả các trường cần thiết
    this.gameForm = this.fb.group({
      Title: ['', Validators.required],
      Description: [''], // Mô tả game
      Price: [0, [Validators.required, Validators.min(0)]],
      CoverImagePath: ['', Validators.required],
      Genre: ['', Validators.required],
      
      MediaUrls: [''], 
      // DiscountPercent: [0, [Validators.min(0), Validators.max(100)]],
      // SaleEndDate: [null]
    });
  }

  ngOnInit(): void {
    this.idgame = this.route.snapshot.paramMap.get('id');
    this.loadInitialData();
  }
  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }
fileChange(event: any) {
  if (event.target.files.length) {
    const fileAllow = '.png,.jpg'; // Allowed file extensions
    const sizeFileAllow = '10'; // Max file size in MB

    const arrayFileAllow = fileAllow.toLowerCase().split(',');

    // Loop through each selected file
    for (let file of event.target.files) {
      const fileExtension = `.${file.name.split('.').pop()}`;

      // Check file extension
      if (!arrayFileAllow.includes(fileExtension.toLowerCase())) {
        this.toastService.warning('Loại file không được hỗ trợ.');
        return;
      }

      // Check file size
      const maxSizeInBytes = parseInt(sizeFileAllow) * 1024 * 1024; // Convert MB to Bytes
      if (file.size > maxSizeInBytes) {
        this.toastService.warning('Dung lượng file quá lớn.');
        return;
      }

      // Add file to the array of uploaded files
      this.uploadedFiles.push({
        file,
        mediaURL: file.name
      });
    }
  }
}


  // Getter để truy cập form controls dễ dàng hơn trong template
  get f() { return this.gameForm.controls; }

  // Hàm tải dữ liệu ban đầu cho form
   loadInitialData(): void {
    this.isLoading = true;
    this.pageTitle = this.idgame ? 'Chỉnh sửa thông tin Game' : 'Thêm Game Mới';

    this.gameService.getListDiscount().subscribe((data) => {
      this.listDiscount = data.data;
      if(!this.idgame){
        this.discountId = this.listDiscount[0].id;
      }
    });
    this.tagService.getListTag().subscribe((data) => {
      this.listTags = data.data;
    })
    this.categoryService.getListCategory().subscribe({
      next: (categoryData) => {
        this.listCategory = categoryData.data;

        if (this.idgame) {
          this.gameService.getGameDetail(this.idgame).subscribe({
            next: (gameData) => {
              const game = gameData.data;
              this.game = gameData.data;
                 this.gameForm.patchValue({
              Title: game.Title,
              Description: game.Description,
              Price: game.Price,
              CoverImagePath: game.CoverImagePath,
              Genre: game.Genre,
              
            });
            this.discountId = game.Discounts[0].id;
          this.tagSelected = game.Tags ? game.Tags.map((tag: any) => tag.TagID) : [];
              this.uploadedFiles = game.Media.map((media: any) => ({
                file: new File([media.MediaURL], media.MediaURL, { type: 'application/octet-stream' }),
                mediaURL: media.MediaURL,
              }));
              this.isLoading = false;
            },
            error: (err) => {
              this.toastService.error('Không thể tải thông tin game.', 'Lỗi');
              console.error(err);
              this.isLoading = false;
            },
            
          });

        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.toastService.error('Không thể tải danh sách thể loại.', 'Lỗi');
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  onChangeDiscount(value: any){
    this.discountId = value.target.value;
    console.log(this.discountId);
  }
 onSave(): void {
    if (this.gameForm.invalid) {
      this.toastService.error('Vui lòng điền đầy đủ các trường bắt buộc.', 'Lỗi');
      this.gameForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formValues = this.gameForm.value;
    const currentUser = this.userLogged.getCurrentUser();

    const mediaUrls = (formValues.MediaUrls || '')
      .split(',')
      .map((url: string) => url.trim())
      .filter((url: string) => url);
    console.log(this.tagSelected);
    const createPayload = {
      id: 0,
      title: formValues.Title,
      description: formValues.Description,
      price: formValues.Price,
      coverImagePath: formValues.CoverImagePath,
      installerFilePath: formValues.CoverImagePath,
      createdBy: currentUser.userId,
      isActive: true,
      status: 'active',
      genre: formValues.Genre,
      developerId: currentUser.userId,
    };
    if (!this.idgame) {
      this.gameService.createGame(createPayload).subscribe({
        next: (response) => {
          this.toastService.success('Thêm game mới thành công!');
          // Upload files with media URLs
          this.uploadedFiles.forEach((item) => {
            const formData = new FormData();
            formData.append('file', item.file);
            formData.append('mediaURL', item.mediaURL);
            let formDis = {
              discountId: this.discountId,
              gameId: response.data.id
            }
            this.gameService.createGameDiscount(response.data.id, this.discountId).subscribe({
              
            })
            for (let index = 0; index < this.tagSelected.length; index++) {
                const element = this.tagSelected[index];
                let formData = {
                  gameId: response.data.id,
                  tagID: element,
                  createdBy: this.userLogged.getCurrentUser().userId
                }
                this.tagService.addgameTag(formData).subscribe();
              }
            this.gameService.createGameMedia(formData, response.data.id).subscribe({
              next: () => console.log('File uploaded successfully'),
              error: (err) => console.error('Error uploading file:', err),
            });
          });

          this.router.navigate(['/dashboard/manager-game']);
        },
        error: (err) => {
          this.toastService.error('Đã có lỗi xảy ra khi thêm game.', 'Lỗi');
          console.error(err);
        },
      });
    } else {
         this.checkTags();
      createPayload.id = parseInt(this.idgame);
      this.gameService.UpdateGame(createPayload, this.idgame).subscribe({
        next: (response) => {
        this.gameService.deleteGameDiscount(this.idgame,this.game.Discounts[0].id).subscribe();
          this.toastService.success('Cập nhật game thành công!');
          this.router.navigate(['/dashboard/manager-game']);
        },
        error: (err) => {
          this.toastService.error('Đã có lỗi xảy ra khi cập nhật game.', 'Lỗi');
          console.error(err);
        },
      });
    }
  }

  getTagNameById(tagId: number): string {
    console.log("tagId",tagId);
    debugger
    const tag = this.listTags.find(t => t.Id === tagId);
    return tag ? tag.TagName : 'Unknown';
  }
checkTags(){
  this.tagService.getListGameTag().subscribe((data) => {
    debugger
    var x = data.data.filter((x:any) => x.GameID == parseInt(this.idgame));
    for (let index = 0; index < x.length; index++) {
      const element = x[index];
      this.tagService.DeleteGameTag(element.Id).subscribe();
    }
    
  })
  for (let index = 0; index < this.tagSelected.length; index++) {
      const element = this.tagSelected[index];
      let formData = {
        gameId: this.idgame,
        tagID: element,
        createdBy: this.userLogged.getCurrentUser().userId
      }
      this.tagService.addgameTag(formData).subscribe();
    }
}
  goBack(): void {
    this.location.back();
  }
}