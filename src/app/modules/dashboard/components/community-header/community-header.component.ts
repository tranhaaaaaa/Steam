import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-community-header',
  imports: [CommonModule],
  templateUrl: './community-header.component.html',
  styleUrl: './community-header.component.css'
})
export class CommunityHeaderComponent {
  tabs: string[] = [
    'Tất cả',
    'Tranh ảnh',
    'Phát sóng',
    'Video',
    'Workshop',
    'Tin tức',
    'Hướng dẫn',
    'Đánh giá'
  ];

  selectedTab: string = 'Tất cả';
}
