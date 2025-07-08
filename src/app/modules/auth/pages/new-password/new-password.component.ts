import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrService } from 'ngx-toastr';
import { AddUser } from 'src/app/core/models/db.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';export interface UserReceive {
  username : string,
  email : string
}
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  standalone:true,
  styleUrls: ['./new-password.component.css'],
  imports: [ButtonComponent, CommonModule, FormsModule,NgOtpInputModule],
})
export class NewPasswordComponent implements OnInit {
  public userLogged = new UserLogged();
  public username : any;
  email: string | null = null;  // Store the email here
  public inputs = Array(6);  // Input fields (6 in total)

  otp: string = '';  // Can be used to store the concatenated OTP if needed
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  }
  constructor(private authService : AuthService,
    private router : Router,
    private userService : UserService,
    private toastService : ToastrService
  ) {}
  onOtpChange(otp: any) {
    this.otp = otp;
  }
  onSubmit(): void {
    // this.authService.getUserByUsername(this.username).subscribe(res => {
    //     console.log(res.data[0].Email);
      this.userService.getListUser().subscribe((data) => {
        const x = data.data.filter((x: any) => x.UserName == this.username);
        this.email = x[0].Email;
        console.log(this.email);
    
    let formData = {
      email: this.email,
      otp: this.otp
    }
    this.authService.verifyLogin(formData).subscribe(res => {
      console.log(res);
   
     
      this.userLogged.setCurrentUser(res.data[0].token, res.data[0].userid, JSON.stringify(res.data[0].roles), res.data[0].username);

      // this.userLogged.setCurrentUser(res.token, res.userId,  JSON.stringify(res.roles), res.username);
      //  this.router.navigate(['/']);
      window.location.href = '/';
       
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
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
  }
}
