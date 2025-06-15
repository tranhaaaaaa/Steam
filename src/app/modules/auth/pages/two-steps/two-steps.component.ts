import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-two-steps',
  templateUrl: './two-steps.component.html',
  styleUrls: ['./two-steps.component.css'],
  imports: [ButtonComponent, CommonModule, FormsModule,NgOtpInputModule],
})
export class TwoStepsComponent implements OnInit {
  public userLogged = new UserLogged();
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
    private toastService : ToastrService
  ) {}
  onOtpChange(otp: any) {
    this.otp = otp;
  }

  onSubmit(): void {
    let formData = {
      email: this.email,
      otp: this.otp
    }
    this.authService.verify(formData).subscribe(res => {
      console.log(res);
      this.router.navigate(['auth/sign-in']);
       
    },
    error => {
    if(error.error.text=='Đăng ký thành công, tài khoản đã kích hoạt!'){
      this.router.navigate(['auth/sign-in']);
      this.userLogged.deleteEmail();
  } else{
    this.toastService.error('Có lỗi xảy ra!');
  }
    }
    )
  }

  ngOnInit(): void {
    this.email = this.getCookie('_email');

  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
  }
}
