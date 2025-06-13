import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddUser, User } from 'src/app/core/models/db.model';
import { UserService } from 'src/app/core/services/user.service';
import { Nft } from '../../models/nft';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-user',
  imports: [CommonModule,AngularSvgIconModule],
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
  constructor( private  userService :UserService,
    private router : Router
  ){
  }
  ngOnInit(): void {
    this.onGetData();
  }
  onGetData(){
   this.userService.getListUser().subscribe((data)=> {
   this.listUser = data.data;
this.totalItems = this.listUser.length;  
      this.paginateUsers(); 
   });
  }
   paginateUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.listUser.slice(startIndex, endIndex);
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

}
