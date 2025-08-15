import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddUser, User } from 'src/app/core/models/db.model';
import { UserService } from 'src/app/core/services/user.service';
import { Nft } from '../../models/nft';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameService } from 'src/app/core/services/game.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-user',
  imports: [CommonModule,AngularSvgIconModule,FormsModule],
  templateUrl: './manager-user.component.html',
  styleUrl: './manager-user.component.css'
})
export class ManagerUserComponent implements OnInit {
  public listUser : User[]=[];
  newUser: AddUser = new AddUser();
@Input() auction = <Nft>{};
currentPage: number = 1; 
  itemsPerPage: number = 10;  
  totalItems: number = 0;  
  paginatedUsers: User[] = []; 
    searchTerm: string = '';
  constructor( private  userService :UserService,
    private router : Router,
    private toastService : ToastrService,
    private gameService : GameService
  ){
    
  }
  ngOnInit(): void {
    this.onGetData();
  }
  onGetData(){
   this.userService.getListUser().subscribe((data)=> {
   this.listUser = data.data;
    console.log(this.listUser);
this.totalItems = this.listUser.length;  
      this.paginateUsers(); 
   });
  }
  paginateUsers() {
    let filtered = [...this.listUser];

    // Lọc theo searchTerm (username hoặc email)
    if (this.searchTerm.trim() !== '') {
      const lowerTerm = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.UserName.toLowerCase().includes(lowerTerm) ||
        user.Email.toLowerCase().includes(lowerTerm)
      );
    }

    this.totalItems = filtered.length;
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = filtered.slice(startIndex, endIndex);
  }
    onSearchChange() {
    this.currentPage = 1; // Reset trang khi tìm kiếm
    this.paginateUsers();
  }
  onDetailPages(user : User){
    this.router.navigate([`dashboard/manager-user/user-detail/${user.Id}`]);
  }
  changePage(page: number) {
    this.currentPage = page;
    this.paginateUsers();  // Cập nhật danh sách người dùng theo trang mới
  }
 get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
toggleStatus(user: User){
  debugger
  if(user.Status == 'active'){
      this.gameService.bandUser(user.Id).subscribe(res => {
        this.toastService.success("Khóa người dùng thành công!");
        this.onGetData();
      })
  }
  else
if(user.Status == 'banned'){
      this.gameService.unbandUser(user.Id).subscribe(res => {
        this.toastService.success("Mở khóa người dùng thành công!");
        
      })
  }
  

}
}
