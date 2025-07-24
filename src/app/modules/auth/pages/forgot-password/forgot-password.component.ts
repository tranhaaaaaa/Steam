import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent,FormsModule,CommonModule]
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService : ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.value.email;
      console.log('Submit email:', email);
    let formData ={
      email: email
    }
      this.authService.forgotPass(formData).subscribe(res => {
      if(res.success){
        this.toastService.success("Mã otp đã gửi về email!");
        this.forgotForm.reset();
        this.router.navigate(['auth/verify-password']);
      }
      },
      error => {
        console.log(error);
        this.toastService.error("Có lỗi xảy ra!");
      })
    }
  }
}
