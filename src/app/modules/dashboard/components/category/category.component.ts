import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/models/db.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Component({
  selector: 'app-category',
  imports: [FormsModule,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  public listCategory : Category[]=[];
   public searchTerm: string = '';
  public userlogged = new UserLogged();
  public allCate : Category[]=[];
  public cateDetail : Category = new Category();
  currentPage: number = 1; 
    itemsPerPage: number = 5;  
    totalItems: number = 0;  
    paginatedUsers: Category[] = []; 
  constructor(private service : CategoryService,
    private toastService : ToastrService
  ) { }
  ngOnInit(): void {
    this.onGetData();
  }

  isDialogOpen = false;
  dialogMode: 'add' | 'edit' = 'add';
  tempCategory = { id: 0, name: '' };

  openDialog(mode: 'add' | 'edit', category: any = null) {
    this.dialogMode = mode;
    this.isDialogOpen = true;

    if (mode === 'edit' && category) {
      this.service.GetCategoryId(category.Id).subscribe(res => {
        this.cateDetail= res.data;
        this.tempCategory = {
      id: this.cateDetail.Id,
      name: this.cateDetail.CategoryName
    };
    console.log(this.tempCategory);
      })
    } else {
      this.tempCategory = { id: 0, name: '' };
    }
  }
  //    paginateUsers() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   this.paginatedUsers = this.listCategory.slice(startIndex, endIndex);
  // }
changePage(page: number) {
  if (page < 1 || page > this.totalPages) return;  // Kiểm tra xem trang có hợp lệ không
  this.currentPage = page;
  this.updatePagination();  // Cập nhật lại phân trang khi thay đổi trang
}

  updatePagination() {
  let filtered = [...this.allCate];

  if (this.searchTerm.trim() !== '') {
    const keyword = this.searchTerm.trim().toLowerCase();
    filtered = filtered.filter(tag =>
      tag.CategoryName?.toLowerCase().includes(keyword)
    );
  }

  this.totalItems = filtered.length;  // Cập nhật lại tổng số phần tử
  this.paginateUsers(filtered);  // Phân trang lại dữ liệu
}

paginateUsers(filteredList: Category[]) {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.paginatedUsers = filteredList.slice(startIndex, endIndex);
}

    onSearchChange() {
    this.currentPage = 1;
    this.updatePagination();
  }
 get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  closeDialog() {
    this.isDialogOpen = false;
  }

saveCategory(form: NgForm) {
  if (form.invalid) {
    this.toastService.warning("Vui lòng nhập tên danh mục!");
    return;
  }
    if (this.dialogMode === 'add') {
      let formData = {
        categoryName : this.tempCategory.name,
        createdBy : this.userlogged.getCurrentUser().userId
      }
      this.service.addCategory(formData).subscribe(res => {
        this.onGetData();
        this.toastService.success("Thêm danh mục thành công!");
      },
      error => {
        this.toastService.error("Có lỗi xảy ra!");
      });
     console.log(this.tempCategory);
    } else if (this.dialogMode === 'edit') {
        let formData = {
          id : this.tempCategory.id,
        categoryName : this.tempCategory.name,
        createdBy : this.userlogged.getCurrentUser().userId,
        createdAt : new Date()
      }
      this.service.updateCategory(formData,this.tempCategory.id).subscribe(res => {
        this.onGetData();
        this.toastService.success("Cập nhật danh mục thành công!");
      },
      error => {
        this.toastService.error("Có lỗi xảy ra!");
      }); 
      
    }
    this.closeDialog();
  }

  deleteCategory(id: number) {
    // this.categories = this.categories.filter(c => c.id !== id);
    this.service.DeleteCategory(id).subscribe(res => {
      this.onGetData();
      this.toastService.success("Xóa danh mục thành cong!");
    },
    error => {
      this.toastService.error("Có lỗi xảy ra!");
    })
  }
onGetData(){
  this.service.getListCategory().subscribe(res => {
      this.allCate = res.data || [];
      this.currentPage = 1;
        this.updatePagination();  
  });
}
}
