import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, AngularSvgIconModule ,ButtonComponent,ReactiveFormsModule],
})
export class SignUpComponent implements OnInit {
   registerForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private service : AuthService,
    private router: Router,
    private toastrService : ToastrService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^(0[0-9]{9})$/)]],
      password: ['', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/)
  ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }
 passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }
  ngOnInit(): void {}

   onSubmit() {
     if (this.registerForm.valid) {
      console.log(this.registerForm.value); 
      const username = this.registerForm.get('username')?.value;
      const email = this.registerForm.get('email')?.value;
      const phonenumber = this.registerForm.get('phonenumber')?.value;
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      let formData = {
        username: username,
        email: email,
        phoneNumber: phonenumber,
        password: password,
      }
      this.service.register(formData).subscribe(res => {
        console.log(res);
        if(res ==='User registered.') {
          this.toastrService.success('Đăng ký thanh cong!');
          this.router.navigate(['auth/sign-in']);
        }
      },
      error => {
        this.toastrService.error('Có lỗi xảy ra!');
      }
    )
    } else {
        console.log(this.registerForm.value); 
      this.toastrService.error('Vui lòng nhập đủ thông tin.');
      this.registerForm.markAllAsTouched(); 
    }
  }
}
