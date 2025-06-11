import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddUser, User } from 'src/app/core/models/db.model';
import { UserService } from 'src/app/core/services/user.service';
import { Nft } from '../../models/nft';

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
  constructor( private  userService :UserService){
  }
  ngOnInit(): void {
    this.onGetData();
  }
  onGetData(){
   this.userService.getListUser().subscribe((data)=> {
   this.listUser = data;
   console.log(this.listUser);
   });
  }

 


}
