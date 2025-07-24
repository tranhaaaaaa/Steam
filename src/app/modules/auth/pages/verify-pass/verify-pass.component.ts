import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-verify-pass',
  templateUrl: './verify-pass.component.html',
  styleUrls: ['./verify-pass.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent,CommonModule]
})
export class VerifyPassComponent implements OnInit {
  verifyForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private autService : AuthService,
    private toastService : ToastrService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
      newPassword: ['', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/)
  ]],
});
  }

  onSubmit(): void {
    if (this.verifyForm.valid) {
      const formValue = this.verifyForm.value;
      console.log('Form Submitted:', formValue);
     this.autService.verifypass(formValue).subscribe(res => {
      if(res.success== true){
        this.toastService.success("Đổi mật khẩu thành công!");
        this.router.navigate(['auth/sign-in']);
      }
    
      else{
        console.log(res);
        this.toastService.error(res.message);
      }
     },
     error => {
        this.toastService.error("OTP không đúng hoặc đã bị hết hạn!");
     })
    }
  }
}
