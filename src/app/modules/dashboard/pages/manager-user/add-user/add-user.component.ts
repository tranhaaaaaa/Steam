import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataResponse } from 'src/app/core/models/data-reponse.service';
import { AddUser, User } from 'src/app/core/models/db.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-user',
  imports: [CommonModule,FormsModule  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  newUser: AddUser
   = new AddUser();

  constructor(private userService: UserService) {}

  addUser() {
    console.log('Thêm người dùng:', this.newUser);
    this.userService.createUser(this.newUser).subscribe((data)=>{
        
      })

  }
}