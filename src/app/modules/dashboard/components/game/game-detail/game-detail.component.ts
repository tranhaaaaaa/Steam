
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category, Discount, GameInfor } from 'src/app/core/models/db.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { GameService } from 'src/app/core/services/game.service';
import { GamecategoryService } from 'src/app/core/services/gamecategory.service';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { finalize, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  gameForm!: FormGroup;
  public listDiscount : Discount[] = []
  listCategory: Category[] = [];
  idgame: string | null = null;
  userLogged = new UserLogged();
 listHashtags = ['Hành Động', 'Phiêu Lưu', 'Kinh Dị', 'Chiến Thuật', 'Indie', 'VR', 'Online', 'Offline'];
  // Các thuộc tính cần thiết cho giao diện "làm đẹp"
  pageTitle = 'Đang tải...';
  isLoading = true;
  isSaving = false;
  public discountId : any;

  constructor(
    private gameService: GameService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastService: ToastrService,
    private gameCategoryService: GamecategoryService,
    private router: Router,
    private location: Location
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

  // Getter để truy cập form controls dễ dàng hơn trong template
  get f() { return this.gameForm.controls; }

  // Hàm tải dữ liệu ban đầu cho form
  loadInitialData(): void {
    this.isLoading = true;
    this.pageTitle = this.idgame ? 'Chỉnh sửa thông tin Game' : 'Thêm Game Mới';
    this.gameService.getListDiscount().subscribe(data => {
      this.listDiscount = data;
    })
    this.categoryService.getListCategory().subscribe({
      next: (categoryData) => {
        this.listCategory = categoryData.data;

        if (this.idgame) {
          this.gameService.getGameDetail(this.idgame).subscribe({
            next: (gameData) => {
              const game = gameData.data;
              const mediaUrlsString = Array.isArray(game.MediaUrls) ? game.MediaUrls.join(', ') : '';
              
              this.gameForm.patchValue({
                ...game,
                MediaUrls: mediaUrlsString
              });
              this.isLoading = false; 
            },
            error: (err) => {
              this.toastService.error('Không thể tải thông tin.', 'Lỗi');
              console.error(err);
              this.isLoading = false;
            }
          });
        } else {
          
          this.isLoading = false; 
        }
      },
      error: (err) => {
        this.toastService.error('Không thể tải danh sách thể loại.', 'Lỗi');
        console.error(err);
        this.isLoading = false; // Vẫn tắt loading để form hiện ra
      }
    });
  }
  onChangeDiscount(value: any){
    this.discountId = value.target.value;
    console.log(this.discountId);
  }
onSave() {
  if (this.gameForm.invalid) {
    this.toastService.error('Vui lòng điền đầy đủ các trường bắt buộc.', 'Lỗi');
    this.gameForm.markAllAsTouched(); // Hiển thị lỗi validation cho người dùng
    return;
  }

  this.isSaving = true;
  const formValues = this.gameForm.value;
  const currentUser = this.userLogged.getCurrentUser();

 
  const mediaUrls = (formValues.MediaUrls || '')
    .split(',')
    .map((url: string) => url.trim())
    .filter((url: string) => url); 

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
    // media: media,
    // activeDiscounts: activeDiscounts
  };

  this.gameService.createGame(createPayload).pipe(
    switchMap(newGameResponse => {
      const categoryId = this.listCategory.find(c => c.CategoryName === formValues.Genre)?.Id;
      if (!categoryId) {
        this.toastService.error('Không tìm thấy thể loại hợp lệ.', 'Lỗi');
        return of(null); 
      }
      const gameCategoryPayload = {
        gameID: newGameResponse.data.id,
        categoryID: categoryId,
        createdBy: currentUser.userId,
      };
      return this.gameCategoryService.createGameCategory(gameCategoryPayload);
    }),
    finalize(() => this.isSaving = false) 
  ).subscribe({
    next: (response) => {
      if (response) {
        this.toastService.success('Thêm game mới thành công!');
          const media = mediaUrls.map((url: string) => ({
            id: 0,
            gameId: response.data.id, 
            mediaURL: url
  }));
         for (let index = 0; index < media.length; index++) {
          const element = media[index];
             let formData = {
               id: 0,
               gameId:response.data.id,
               mediaURL: element.mediaURL
             }
             this.gameService.createGameMedia(formData, response.data.id).subscribe();
         }
         this.gameService.createGameDiscount(response.data.id, this.discountId).subscribe();

        this.router.navigate(['/dashboard/manager-game']); 
      }
    },
    error: (err) => {
      this.toastService.error('Đã có lỗi xảy ra khi thêm game.', 'Lỗi');
      console.error(err);
    }
  });
}


  // Hàm cho nút "Quay lại"
  goBack(): void {
    this.location.back();
  }
}