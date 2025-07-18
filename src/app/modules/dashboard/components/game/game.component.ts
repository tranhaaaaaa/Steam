import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameInfor } from 'src/app/core/models/db.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
   public searchTerm: string = '';
     currentPage: number = 1; 
       itemsPerPage: number = 5;  
       totalItems: number = 0;  
         public allCate : GameInfor[]=[];
       paginatedUsers: GameInfor[] = []; 
  constructor(private gameService : GameService,
    private router : Router,
    private toastService : ToastrService
  ) {}
  public listGame : GameInfor[] = [];
  ngOnInit(): void {
    this.onGetData();
  }

  editAccount(account: any) {
   this.router.navigate([`/dashboard/detail/${account.Id}`])
  
  }
  onGetData(){
    this.gameService.getListGame().subscribe(data => {
  this.allCate = data.data || [];
    this.currentPage = 1;
    this.updatePagination();
    })
  }
   paginateUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.listGame.slice(startIndex, endIndex);
  }
  changePage(page: number) {
     this.currentPage = page;
  this.updatePagination();  
  }
    updatePagination() {
    let filtered = [...this.allCate];

    if (this.searchTerm.trim() !== '') {
      const keyword = this.searchTerm.trim().toLowerCase();
      filtered = filtered.filter(tag =>
        tag.Title?.toLowerCase().includes(keyword)
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
 get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  toggleStatus(account: any) {
    console.log(account);
  if (account.isActive === 'active') {
    account.Status = 'inactive';
      this.gameService.inactive(account,account.Id).subscribe(res => {
        this.toastService.success("Cập nhật trạng thái game thành công!");
      })

  } else {
    account.Status = 'active';
     this.gameService.active(account,account.Id).subscribe(res => {
        this.toastService.success("Cập nhật trạng thái game thành công!");
      })
  }
}


}