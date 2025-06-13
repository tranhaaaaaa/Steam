import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataResponse } from 'src/app/core/models/data-reponse.service';
import { AddUser, User } from 'src/app/core/models/db.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-user',
  imports: [CommonModule,FormsModule  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
  public idUser : any;
  public userdetail : User = new User();
  newUser: AddUser= new AddUser();

  constructor(private userService: UserService,
    private toastService : ToastrService,
    public route : ActivatedRoute
  ) {

  }
  ngOnInit(): void {
      this.idUser = this.route.snapshot.paramMap.get('id');
  if (this.idUser) {
    // this.loadUserDetail(id);
  }
  }


  addUser() {
    console.log('Thêm người dùng:', this.newUser);
    this.userService.createUser(this.newUser).subscribe((data)=>{
      this.toastService.success("Thêm người dùng thành công!");
      this.newUser = new AddUser();
      })

  }
    loadUserDetail(id: any) {
     this.userService.getUserById(id).subscribe((data)=>{
       this.userdetail  = data;
     })
    }
}