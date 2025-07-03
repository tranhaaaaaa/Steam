
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category, GameInfor } from 'src/app/core/models/db.model';
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
  listCategory: Category[] = [];
  idgame: string | null = null;
  userLogged = new UserLogged();
 listHashtags = ['Hành Động', 'Phiêu Lưu', 'Kinh Dị', 'Chiến Thuật', 'Indie', 'VR', 'Online', 'Offline'];
  // Các thuộc tính cần thiết cho giao diện "làm đẹp"
  pageTitle = 'Đang tải...';
  isLoading = true;
  isSaving = false;

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
      
      // Các trường mới theo yêu cầu
      MediaUrls: [''], // Dạng chuỗi, admin nhập URL cách nhau bằng dấu phẩy
      DiscountPercent: [0, [Validators.min(0), Validators.max(100)]],
      SaleEndDate: [null]
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

    // Luôn lấy danh sách thể loại để điền vào dropdown
    this.categoryService.getListCategory().subscribe({
      next: (categoryData) => {
        this.listCategory = categoryData.data;

        // Nếu là trang sửa, lấy tiếp chi tiết game
        if (this.idgame) {
          this.gameService.getGameDetail(this.idgame).subscribe({
            next: (gameData) => {
              const game = gameData.data;
              // Chuyển đổi mảng media (nếu có) thành chuỗi để patch vào form
              const mediaUrlsString = Array.isArray(game.MediaUrls) ? game.MediaUrls.join(', ') : '';
              
              this.gameForm.patchValue({
                ...game,
                MediaUrls: mediaUrlsString
              });
              this.isLoading = false; // Tắt loading khi đã có đủ dữ liệu
            },
            error: (err) => {
              this.toastService.error('Không thể tải thông tin game.', 'Lỗi');
              console.error(err);
              this.isLoading = false; // Vẫn tắt loading để form hiện ra
            }
          });
        } else {
          // Nếu là trang thêm mới, không cần làm gì thêm
          this.isLoading = false; // Tắt loading ngay
        }
      },
      error: (err) => {
        this.toastService.error('Không thể tải danh sách thể loại.', 'Lỗi');
        console.error(err);
        this.isLoading = false; // Vẫn tắt loading để form hiện ra
      }
    });
  }

  // Hàm xử lý khi nhấn nút Lưu
  onSave(): void {
    if (this.gameForm.invalid) {
      this.toastService.error('Vui lòng điền đầy đủ các trường bắt buộc.', 'Lỗi');
      this.gameForm.markAllAsTouched(); // Hiển thị lỗi validation cho người dùng
      return;
    }

    this.isSaving = true;
    const formValues = this.gameForm.value;
    const currentUser = this.userLogged.getCurrentUser();
    // Chuyển đổi chuỗi MediaUrls từ form thành mảng các URL sạch
    const mediaUrls = (formValues.MediaUrls || '')
      .split(',')
      .map((url: string) => url.trim())
      .filter((url: string) => url); // Lọc bỏ các chuỗi rỗng

    if (this.idgame) {
      // Logic cập nhật game (bạn có thể thêm sau)
      this.toastService.info('Chức năng cập nhật đang được phát triển.');
      this.isSaving = false;
    } else {
      // Logic tạo mới game

      const createPayload = {
        title: formValues.Title,
        description: formValues.Description,
        price: formValues.Price,
        coverImagePath: formValues.CoverImagePath,
        installerFilePath: formValues.CoverImagePath, // Tạm thời dùng chung ảnh bìa
        createdBy: currentUser.userId,
        status: "Active",

        developerId: currentUser.userId,
        // Thêm dữ liệu mới vào payload
        mediaUrls: JSON.stringify(mediaUrls), // Gửi dưới dạng chuỗi JSON để lưu vào DB
        discountPercent: formValues.DiscountPercent,
        saleEndDate: formValues.SaleEndDate
      };

      // Sử dụng switchMap để xử lý chuỗi API một cách sạch sẽ
      this.gameService.createGame(createPayload).pipe(
        switchMap(newGameResponse => {
          const categoryId = this.listCategory.find(c => c.CategoryName === formValues.Genre)?.Id;
          if (!categoryId) {
            this.toastService.error('Không tìm thấy thể loại hợp lệ.', 'Lỗi');
            return of(null); // Trả về observable null để dừng chuỗi
          }
          const gameCategoryPayload = {
            gameID: newGameResponse.data.id,
            categoryID: categoryId,
            createdBy: currentUser.userId,
          };
          return this.gameCategoryService.createGameCategory(gameCategoryPayload);
        }),
        finalize(() => this.isSaving = false) // Luôn tắt spinner nút lưu, dù thành công hay thất bại
      ).subscribe({
        next: (response) => {
          if (response) {
            this.toastService.success('Thêm game mới thành công!');
            this.router.navigate(['/dashboard/manager-game']); // Chuyển về trang danh sách
          }
        },
        error: (err) => {
          this.toastService.error('Đã có lỗi xảy ra khi thêm game.', 'Lỗi');
          console.error(err);
        }
      });
    }
  }

  // Hàm cho nút "Quay lại"
  goBack(): void {
    this.location.back();
  }
}