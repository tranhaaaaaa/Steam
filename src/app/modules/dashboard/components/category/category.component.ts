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
  public userlogged = new UserLogged();
  public cateDetail : Category = new Category();
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
    this.listCategory = res.data;
    console.log(this.listCategory);
  });
}
}
