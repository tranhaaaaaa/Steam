import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Component({
  selector: 'app-two-steps',
  templateUrl: './two-steps.component.html',
  styleUrls: ['./two-steps.component.css'],
  imports: [ButtonComponent, CommonModule, FormsModule],
})
export class TwoStepsComponent implements OnInit {
  public userLogged = new UserLogged();
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
    const otp = this.inputValues.join(''); 
    let formData = {
      email: this.email,
      otp: otp
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
    console.log('Email from cookie:', this.email);

    this.inputValues = this.inputs.map(() => '');
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
  }
}
