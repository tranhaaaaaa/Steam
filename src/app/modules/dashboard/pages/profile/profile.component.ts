// src/app/modules/dashboard/pages/profile/profile.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/db.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderHistoryComponent } from '../../components/order-history/order-history.component';

// Định nghĩa cấu trúc dữ liệu (giữ nguyên)
interface UserProfile {
  username: string;
  realName: string;
  country: string;
  avatarUrl: string;
  level: number;
  motto: string;
  status: string;
}

interface FeaturedBadge {
  title: string;
  xp: number;
  imageUrl: string;
}

interface ProfileBadge {
  name: string;
  imageUrl: string;
}

interface GameActivity {
  gameTitle: string;
  bannerUrl: string;
  playtime: string;
  lastPlayed: string;
  achievementsUnlocked: number;
  achievementsTotal: number;
  achievementIcons: string[];
  review?: {
    text: string;
    likes: number;
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule,ReactiveFormsModule,OrderHistoryComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  passwordForm!: FormGroup;
  showPassword: boolean = false;
showNewPassword: boolean = false;
showConfirmPassword: boolean = false;
  public userLogged = new UserLogged();
  profileForm!: FormGroup;
  userinfo: User = new User();
  fileUpload : any;
  file: any;
  showProfileDialog = false;
  showPasswordDialog = false;

  constructor(private fb: FormBuilder, private userService: UserService,
    private toastService : ToastrService,
    private autheService : AuthService
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.onGetUser();
  }

  onGetUser() {
    const userId = this.userLogged.getCurrentUser().userId;
    this.userService.getUserById(userId).subscribe((data) => {
      this.userinfo = data.data[0];
      this.profileForm = this.fb.group({
        username: [{ value: data.data[0].username, disabled: true }],
        email: [data.data[0].email, [Validators.required, Validators.email]],
        phoneNumber: [data.data[0].phoneNumber, Validators.required]
      });
    });
  }

  openProfileDialog() {
    this.showProfileDialog = true;
    this.profileForm = this.fb.group({
        username: [{ value:  this.userinfo.UserName, disabled: true }],
        email: [ this.userinfo.Email, [Validators.required, Validators.email]],
        phoneNumber: [ this.userinfo.PhoneNumber, Validators.required]
      });
  }

  openPasswordDialog() {
    this.showPasswordDialog = true;
  }

  closeDialogs() {
    this.showProfileDialog = false;
    this.showPasswordDialog = false;
  }
 fileChange(event: any) {
  console.log(event.target.files)
    if (event.target.files.length) {
       const fileAllow = '.png,.jpg'; // Allowed file extensions
      const sizeFileAllow = '10'; // Max file size in MB

      const arrayFileAllow = fileAllow.toLowerCase().split(',');
      // If not any setting
      if (!fileAllow || !sizeFileAllow) {
        this.file = event.target.files[0].name;
        this.fileUpload = event.target.files[0];
        return;
      }
      // Check File Extension
      const fileExtension = `.${event.target.files[0].name.split('.').pop()}`;
      if (arrayFileAllow.indexOf(fileExtension.toLowerCase()) === -1) {
        this.toastService.warning('Loại file không được hỗ trợ.');
        return;
      }
      // Check File Size
      if (event.target.files[0].size > parseInt(sizeFileAllow) * 1024 * 1024) {
        this.toastService.warning('Dung lượng file quá lớn.');
        return;
      }
      this.file = event.target.files[0].name;
       this.fileUpload = event.target.files[0];
    }
  }
onSaveProfile(): void {
  if (this.profileForm.valid) {
    const updated = this.profileForm.getRawValue();
    console.log('Cập nhật thông tin:', updated);

    let formData = new FormData();
    formData.append('Username', updated.username);
    formData.append('Email', updated.email);
    formData.append('PhoneNumber', updated.phoneNumber);

    // Append the image file if present
    if (this.fileUpload) {
      formData.append('imageFile', this.fileUpload);
    }

    // Call API to update the user profile
    this.userService.updateProfile(formData, this.userLogged.getCurrentUser().userId).subscribe({
      next: (res) => {
        // Show success message
        this.toastService.success('Cập nhật thông tin thành công!');
        
        // Refresh user info
        this.onGetUser();

        // Close the profile dialog after successful update
        this.closeDialogs();
      },
      error: (err) => {
        // Show error message in case of failure
        this.toastService.error('Có lỗi xảy ra, hãy kiểm tra lại', 'Thất bại');
        console.error(err);
      }
    });
  }
}


  onChangePassword(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

      if (newPassword !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
      }

      console.log('Đổi mật khẩu:', { currentPassword, newPassword });
      let formData = {
        currentPassword: currentPassword,
        newPassword: newPassword
      }
      this.autheService.changePass(formData).subscribe(res => {
        this.toastService.success("Đổi mật khẩu thành công!");
        this.onGetUser();
        this.passwordForm.reset();
      }
      ,error => {
        this.toastService.error("Có lỗi xảy ra, hãy kiểm tra lại","Thất bại");
      });
      this.closeDialogs();
    
    }
  }
}
