import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrService } from 'ngx-toastr';
import { AddUser } from 'src/app/core/models/db.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

export interface UserReceive {
  username : string,
  email : string
}
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
  imports: [ButtonComponent, CommonModule, FormsModule],
})
export class NewPasswordComponent implements OnInit {
  public userLogged = new UserLogged();
  public username : any;
  email: string | null = null;  // Store the email here
  public inputs = Array(6);  // Input fields (6 in total)

  otp: string = '';  // Can be used to store the concatenated OTP if needed
  public inputValues: string[] = [];  // Array to store values from each input field

  constructor(private authService : AuthService,
    private router : Router,
    private toastService : ToastrService
  ) {}

  onchange(index: number): void {
    console.log(`Input at index ${index}: ${this.inputValues[index]}`);
  }
  onSubmit(): void {
    this.authService.getUserByUsername(this.username).subscribe(res => {
        console.log(res.data[0].Email);
 
    const otp = this.inputValues.join(''); 
    let formData = {
      email: res.data[0].Email,
      otp: otp
    }
    this.authService.verifyLogin(formData).subscribe(res => {
      console.log(res);
       const decodedToken = this.authService.decodeToken(res.token);
      
      // Lấy userId, username từ decoded token
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      const username = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const roles = JSON.stringify(res.roles);
      console.log('User ID:', userId);
      console.log('Username:', username);
      // Đặt người dùng hiện tại
      this.userLogged.setCurrentUser(res.token, userId, roles, username);

      // this.userLogged.setCurrentUser(res.token, res.userId,  JSON.stringify(res.roles), res.username);
       this.router.navigate(['/']);
       
    },
    error => {
    if(error.error.text=='Đăng ký thành công, tài khoản đã kích hoạt!'){
      this.router.navigate(['/']);
      this.userLogged.deleteEmail();
  } else{
    this.toastService.error('Có lỗi xảy ra!');
  }
    }
    )
     })
  }

  ngOnInit(): void {
    this.username = this.getCookie('_username');
    console.log('Email from cookie:', this.username);

    this.inputValues = this.inputs.map(() => '');
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
  }
}
