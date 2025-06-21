import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tag } from 'src/app/core/models/db.model';
import { TagsService } from 'src/app/core/services/tags.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
  public allTags: Tag[] = [];       // Dữ liệu gốc
  public paginatedUsers: Tag[] = []; // Dữ liệu hiển thị
  public searchTerm: string = '';

  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public totalItems: number = 0;

  public isDialogOpen = false;
  public dialogMode: 'add' | 'edit' = 'add';
  public tempTag = { id: 0, name: '' };
  public tagDetail = new Tag();

  public userlogged = new UserLogged();

  constructor(
    private tagService: TagsService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData() {
    this.tagService.getListTag().subscribe(data => {
      this.allTags = data.data || [];
      this.currentPage = 1;
      this.updatePagination();
    });
  }

  updatePagination() {
    let filtered = [...this.allTags];

    if (this.searchTerm.trim() !== '') {
      const keyword = this.searchTerm.trim().toLowerCase();
      filtered = filtered.filter(tag =>
        tag.TagName?.toLowerCase().includes(keyword)
      );
    }

    this.totalItems = filtered.length;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = filtered.slice(startIndex, endIndex);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  openDialog(mode: 'add' | 'edit', tag: Tag | null = null) {
    this.dialogMode = mode;
    this.isDialogOpen = true;

    if (mode === 'edit' && tag) {
      this.tagService.GetTagId(tag.Id).subscribe(res => {
        this.tagDetail = res.data[0];
        this.tempTag = {
          id: this.tagDetail.Id,
          name: this.tagDetail.TagName
        };
      });
    } else {
      this.tempTag = { id: 0, name: '' };
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  deleteTag(id: number) {
    this.tagService.DeleteTag(id).subscribe({
      next: () => {
        this.toastService.success("Xóa hashtag thành công!");
        this.onGetData();
      },
      error: () => this.toastService.error("Có lỗi xảy ra!")
    });
  }

  saveTag(form: NgForm) {
    if (form.invalid) {
      this.toastService.warning("Vui lòng nhập tên hashtag!");
      return;
    }

    const formData = {
      tagName: this.tempTag.name,
      createdBy: this.userlogged.getCurrentUser().userId,
      createdAt: new Date()
    };

    if (this.dialogMode === 'add') {
      this.tagService.addTag(formData).subscribe({
        next: () => {
          this.toastService.success("Thêm hashtag thành công!");
          this.onGetData();
        },
        error: () => this.toastService.error("Có lỗi xảy ra!")
      });
    } else {
      this.tagService.updateTag(formData, this.tempTag.id).subscribe({
        next: () => {
          this.toastService.success("Cập nhật hashtag thành công!");
          this.onGetData();
        },
        error: () => this.toastService.error("Có lỗi xảy ra!")
      });
    }

    this.closeDialog();
  }
}
