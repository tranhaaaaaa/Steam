import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tag } from 'src/app/core/models/db.model';
import { TagsService } from 'src/app/core/services/tags.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Component({
  selector: 'app-tags',
  imports: [FormsModule,CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit{
  public listTag : Tag[]=[];
  public tagDetail = new Tag();
  isDialogOpen = false;
  dialogMode: 'add' | 'edit' = 'add';
  tempTag = { id: 0, name: '' };
  public userlogged = new UserLogged();
  ngOnInit(): void {
    this.onGetData();
  }
constructor(private tagService : TagsService,
  private toastService : ToastrService
) {}

onGetData(){
  this.tagService.getListTag().subscribe(data => {
    this.listTag = data.data;
    console.log(this.listTag);
  })
}
  openDialog(mode: 'add' | 'edit', category: any = null) {
    this.dialogMode = mode;
    this.isDialogOpen = true;

    if (mode === 'edit' && category) {
      this.tagService.GetTagId(category.Id).subscribe(res => {
        this.tagDetail= res.data[0];
        this.tempTag = {
      id: this.tagDetail.Id,
      name: this.tagDetail.TagName
    };
    console.log(this.tempTag);
      })
    } else {
       this.tempTag = { id: 0, name: '' };
    }
  }
  
  closeDialog() {
    this.isDialogOpen = false;
  }
  deleteTag(id: number) {
    // this.categories = this.categories.filter(c => c.id !== id);
    this.tagService.DeleteTag(id).subscribe(res => {
      this.onGetData();
      this.toastService.success("Xóa hastag thành công!");
    },
    error => {
      this.toastService.error("Có lỗi xảy ra!");
    })
  }
  saveTag(form: NgForm) {
      if (form.invalid) {
    this.toastService.warning("Vui lòng nhập tên danh mục!");
    return;
  }
    if (this.dialogMode === 'add') {
      let formData = {
        tagName : this.tempTag.name,
        createdBy : this.userlogged.getCurrentUser().userId
      }
      this.tagService.addTag(formData).subscribe(res => {
        this.onGetData();
        this.toastService.success("Thêm danh mục thành công!");
      },
      error => {
        this.toastService.error("Có lỗi xảy ra!");
      });
     console.log(this.tempTag);
    } else if (this.dialogMode === 'edit') {
        let formData = {
          id : this.tempTag.id,
        tagName : this.tempTag.name,
        createdBy : this.userlogged.getCurrentUser().userId,
        createdAt : new Date()
      }
      this.tagService.updateTag(formData,this.tempTag.id).subscribe(res => {
        this.onGetData();
        this.toastService.success("Cập nhật danh mục thành công!");
      },
      error => {
        this.toastService.error("Có lỗi xảy ra!");
      }); 
      
    }
    this.closeDialog();
  }
}
