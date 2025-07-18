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
     this.loadUserDetail(this.idUser);
  }
  }


  addUser() {
  
    
      let formData = {
        username : this.userdetail.UserName,
        role : this.userdetail.Role,
      }
      console.log(formData);
      console.log(this.idUser);
      this.userService.UpdateUser(formData,this.idUser).subscribe((data)=>{
          this.toastService.success("Cập nhật người dùng thành công!");
      })
    // }
    }

  
    loadUserDetail(id: any) {
     this.userService.getUserById(id).subscribe((data)=>{
       this.userdetail  = data.data[0];
       console.log(this.userdetail);
     })
    }
}