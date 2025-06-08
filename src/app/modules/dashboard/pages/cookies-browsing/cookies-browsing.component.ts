import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface CookieSetting {
  key: string;
  title: string;
  description: string;
  cookies: string;
  privacyPolicyLink?: string;
}

@Component({
  selector: 'app-cookies-browsing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cookies-browsing.component.html',
  styleUrls: ['./cookies-browsing.component.css']
})
export class CookiesBrowsingComponent implements OnInit {

  cookieForm: FormGroup;

  valveCookies: CookieSetting[] = [
    { key: 'recentapps', title: 'Cookie tùy biến nội dung của Valve', description: 'Để tùy biến nội dung được biên tập trên Steam dựa trên dịch vụ bạn dùng', cookies: 'recentapps' },
    { key: 'analytics', title: 'Cookie phân tích của Valve', description: 'Để đo lường khán giả trên Steam và cải thiện dịch vụ', cookies: 'app_impressions và browserid' }
  ];

  thirdPartyCookies: CookieSetting[] = [
    { key: 'youtube', title: 'YouTube', description: 'Cookie được đặt bởi trình phát YouTube được nhúng vào trong Steam.', cookies: 'Tuân theo Chính sách bảo mật của Google', privacyPolicyLink: '#' },
    { key: 'vimeo', title: 'Vimeo', description: 'Cookie được đặt bởi trình phát Vimeo được nhúng vào trong Steam.', cookies: 'Tuân theo Chính sách bảo mật của Vimeo', privacyPolicyLink: '#' },
    { key: 'sketchfab', title: 'Sketchfab', description: 'Cookie được đặt bởi trình phát Sketchfab được nhúng vào trong Steam.', cookies: 'Tuân theo Chính sách bảo mật của Sketchfab', privacyPolicyLink: '#' },
    { key: 'utm', title: 'Đường dẫn bên thứ ba (UTM)', description: 'Một số nhóm phát triển kèm theo các thông tin thêm tới trang cửa hàng Steam của họ với đường dẫn theo định dạng UTM...', cookies: 'UTM' }
  ];

  constructor(private fb: FormBuilder) {
    this.cookieForm = this.fb.group({
      recentapps: [true],
      analytics: [true],
      youtube: [true],
      vimeo: [true],
      sketchfab: [true],
      utm: [true]
    });
  }

  ngOnInit(): void {
    this.cookieForm.valueChanges.subscribe(val => console.log('Cookie form changed:', val));
  }

  toggleCookie(key: string) {
    const control = this.cookieForm.get(key);
    if (control) {
      control.setValue(!control.value);
    }
  }

  acceptAll() {
    this.cookieForm.patchValue({
      recentapps: true,
      analytics: true,
      youtube: true,
      vimeo: true,
      sketchfab: true,
      utm: true
    });
    console.log('Accepted all cookies');
  }

  rejectAll() {
    this.cookieForm.patchValue({
      recentapps: false,
      analytics: false,
      youtube: false,
      vimeo: false,
      sketchfab: false,
      utm: false
    });
    console.log('Rejected all optional cookies');
  }
}