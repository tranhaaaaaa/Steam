import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/models/db.model';
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
    this.gameForm = this.fb.group({
      Title: ['', Validators.required],
      Description: [''],
      Price: [0, [Validators.required, Validators.min(0)]],
      CoverImagePath: ['', Validators.required],
      Genre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.idgame = this.route.snapshot.paramMap.get('id');
    this.loadInitialData();
  }

  // Getter để truy cập form controls dễ dàng hơn trong template
  get f() { return this.gameForm.controls; }

  loadInitialData(): void {
    this.isLoading = true;
    this.pageTitle = this.idgame ? 'Chỉnh sửa thông tin Game' : 'Thêm Game Mới';

    this.categoryService.getListCategory().subscribe({
      next: (categoryData) => {
        this.listCategory = categoryData.data;

        if (this.idgame) {
          this.gameService.getGameDetail(this.idgame).subscribe({
            next: (gameData) => {
              const game = gameData.data;
              this.gameForm.patchValue({
                Title: game.Title,
                Description: game.Description,
                Price: game.Price,
                CoverImagePath: game.CoverImagePath,
                Genre: game.Genre,
              });
              this.isLoading = false;
            },
            error: (err) => {
              this.toastService.error('Không thể tải thông tin game.', 'Lỗi');
              console.error(err);
              this.isLoading = false; // Vẫn tắt loading để form hiện ra
            }
          });
        } else {
          this.isLoading = false; // Tắt loading cho trang thêm mới
        }
      },
      error: (err) => {
        this.toastService.error('Không thể tải danh sách thể loại.', 'Lỗi');
        console.error(err);
        this.isLoading = false; // Vẫn tắt loading để form hiện ra
      }
    });
  }

  onSave(): void {
    if (this.gameForm.invalid) {
      this.toastService.error('Vui lòng điền đầy đủ các trường bắt buộc.', 'Lỗi');
      this.gameForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formData = this.gameForm.value;
    const currentUser = this.userLogged.getCurrentUser();

    if (this.idgame) {
      // Logic cập nhật
      this.toastService.info('Chức năng cập nhật đang được phát triển.');
      this.isSaving = false;
    } else {
      // Logic tạo mới
      const createPayload = {
        title: formData.Title,
        description: formData.Description,
        price: formData.Price,
        coverImagePath: formData.CoverImagePath,
        installerFilePath: formData.CoverImagePath,
        createdBy: currentUser.userId,
        status: "Active",
        developerId: currentUser.userId
      };

      this.gameService.createGame(createPayload).pipe(
        switchMap(newGameResponse => {
          const categoryId = this.listCategory.find(c => c.CategoryName === formData.Genre)?.Id;
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
      ).subscribe(response => {
        if (response) {
          this.toastService.success('Thêm game mới thành công!');
          this.router.navigate(['/admin/games']);
        }
      }, error => {
        this.toastService.error('Đã có lỗi xảy ra khi thêm game.', 'Lỗi');
        console.error(error);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}