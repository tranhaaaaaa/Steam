import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgIf, ButtonComponent, NgClass],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  public userLogged = new UserLogged();
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private service : AuthService,
    private toastService : ToastrService
  ) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required,]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.service.login(this.form.value).subscribe(res => {
      if (res) {
        // this.userLogged.setCurrentUser(res.token, res.userId,  JSON.stringify(res.roles), res.username);
        // window.location.href = '/';
      }
    },
    error => {
      if(error.error.text =='OTP đã gửi về email!'){
        this.toastService.success("OTP đã gửi về email!");
        this.userLogged.setUsername(this.form.value.username);
        this._router.navigate(['auth/verify-login']);
      }
    else{
       this.toastService.warning("Thông tin tài khoản hoặc mật khẩu không chính xác!");
    }
    }
    )
   // this._router.navigate(['/']);
  }
}
