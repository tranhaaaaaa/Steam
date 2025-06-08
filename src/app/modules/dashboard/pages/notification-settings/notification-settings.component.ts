import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface NotificationSetting {
  key: string;
  label: string;
}

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule],
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.css']
})
export class NotificationSettingsComponent implements OnInit {

  notificationForm: FormGroup;

  settings: NotificationSetting[] = [
    { key: 'receiveGifts', label: 'Tôi nhận được quà' },
    { key: 'discussionReply', label: 'Một cuộc thảo luận tôi đăng ký đã có câu trả lời' },
    { key: 'newInventoryItem', label: 'Tôi nhận được vật phẩm mới trong kho đồ' },
    { key: 'friendRequest', label: 'Tôi nhận được lời mời kết bạn' },
    { key: 'majorSale', label: 'Có ưu đãi hoành tráng' },
    { key: 'wishlistDiscount', label: 'Một món trong danh sách ước đang có giảm giá' },
    { key: 'tradeOffer', label: 'Tôi nhận được một đề nghị trao đổi' },
    { key: 'steamSupportReply', label: 'Tôi nhận được hồi âm từ đội hỗ trợ Steam' },
    { key: 'steamTurn', label: 'Tôi nhận được thông báo lượt của Steam' },
    { key: 'familyAccessRequest', label: 'Trẻ nhỏ trong gia đình yêu cầu quyền truy cập vào tính năng Steam' },
    { key: 'familyInvite', label: 'Tôi nhận được lời mời vào nhóm gia đình Steam' },
    { key: 'familyPurchaseRequest', label: 'Trẻ nhỏ trong gia đình yêu cầu mua hàng' },
    { key: 'familyTimeRequest', label: 'Trẻ nhỏ trong gia đình yêu cầu thêm giờ chơi' },
    { key: 'familyAdultPurchaseResponse', label: 'Người lớn trong gia đình phản hồi yêu cầu mua hàng của tôi' },
    { key: 'familyAdultAccessResponse', label: 'Người lớn trong gia đình phản hồi yêu cầu tính năng Steam của tôi' },
    { key: 'familyAdultTimeResponse', label: 'Người lớn trong gia đình phản hồi yêu cầu thời gian chơi của tôi' },
    { key: 'gameFavorited', label: 'Tôi nhận được trò chơi đã yêu cầu' },
  ];

  constructor(private fb: FormBuilder) {
    // Khởi tạo form với các giá trị mặc định
    const formControls: { [key: string]: any } = {};
    this.settings.forEach(setting => {
      formControls[setting.key] = [true]; // Mặc định bật tất cả
    });
    this.notificationForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    this.notificationForm.valueChanges.subscribe(val => console.log('Notification settings changed:', val));
  }

  toggleSetting(key: string) {
    const control = this.notificationForm.get(key);
    if (control) {
      control.setValue(!control.value);
    }
  }
}