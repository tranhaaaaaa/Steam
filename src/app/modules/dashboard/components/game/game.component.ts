import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameInfor } from 'src/app/core/models/db.model';
import { GameService } from 'src/app/core/services/game.service';
import { RolepermissionService } from 'src/app/core/services/rolepermission.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

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
       isAdmin : boolean = false;
       public userLogged = new UserLogged();
  constructor(private gameService : GameService,
    private router : Router,
    private toastService : ToastrService,
    private rolePermission : RolepermissionService
  ) {
    if(this.rolePermission.hasRole(["Admin"])){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
  }
  public listGame : GameInfor[] = [];
  ngOnInit(): void {
    this.onGetData();
  }

  editAccount(account: any) {
   this.router.navigate([`/dashboard/detail/${account.Id}`])
  
  }
    deleteGame(account: any) {
      this.gameService.deleteGame(account.Id).subscribe(res => {
        this.toastService.success("Xóa game thành công!");
        this.onGetData();
      })
  
  }
  onGetData(){
   if(this.isAdmin){
     this.gameService.getListGame().subscribe(data => {
  this.allCate = data.data || [];
    this.currentPage = 1;
    this.updatePagination();
    })
   }else{
     this.gameService.getListGame().subscribe(data => {
  this.allCate = data.data.filter((x: any) => x.CreatedBy == this.userLogged.getCurrentUser().userId);
    this.currentPage = 1;
    this.updatePagination();
    })
   }
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
  if (account.IsActive === false) {
    account.Status = "inactive";
      this.gameService.inactive(account,account.Id).subscribe(res => {
        this.toastService.success("Cập nhật trạng thái game thành công!");
      })

  } else {
    account.Status = "active";
     this.gameService.active(account,account.Id).subscribe(res => {
        this.toastService.success("Cập nhật trạng thái game thành công!");
      })
  }
}


}