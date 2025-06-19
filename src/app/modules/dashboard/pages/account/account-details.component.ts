// src/app/modules/dashboard/pages/account/account-details.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/db.model';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
public userLogged = new UserLogged();
public user= new User();
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.onGetData();
   }

   onGetData(){
     this.userService.getUserById(this.userLogged.getCurrentUser().userId).subscribe((data)=>{
     this.user = data.data[0];
     console.log(this.user);
    })
   }
}