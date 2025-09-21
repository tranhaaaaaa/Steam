// src/app/modules/dashboard/components/community-recommends/community-recommends.component.ts

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CommunityRecommendation {
  id: number;
  title: string;
  mainImage: string;
  description: string;
  tags: string[];
  review: {
    text: string;
    avatar: string;
    author: string;
  };
}

@Component({
  selector: 'app-community-recommends', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-recommends.component.html',
  styleUrls: ['./community-recommends.component.css'] 
})
export class CommunityRecommendsComponent implements OnInit, AfterViewInit {

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  recommendations: CommunityRecommendation[] = [
    {
      id: 1,
      title: 'Wuthering Waves',
      mainImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3513350/e2dae6095f417d6c613cc01ba0ed4d10c3ec2a27/capsule_616x353.jpg?t=1746670477',
      description: 'Một game ARPG thế giới mở đầy hứa hẹn với hệ thống chiến đấu mượt mà, nhanh nhẹn và cốt truyện cuốn hút. Rất đáng thử cho những ai yêu thích thể loại này.',
      tags: ['Thế giới mở', 'Hành động nhập vai', 'Anime', 'Gacha'],
      review: {
        text: 'Đây là một game ARPG thế giới mở rất hứa hẹn, chiến đấu nhanh và mượt, cốt truyện hấp dẫn. Hệ thống gacha khá công bằng, thế giới thì rất đẹp để khám phá. Rất đáng chơi!',
        avatar: 'https://avatars.akamai.steamstatic.com/6a0a9750d695f3f9f5c5d5e5f5d5e5f5d5e5f5d5_medium.jpg',
        author: 'DarkHollow'
      }
    },
    {
      id: 2,
      title: 'Palworld',
      mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
      description: 'Một cú hit bất ngờ khi kết hợp bắt quái vật với sinh tồn và chế tạo. Hỗn loạn, vui nhộn và bất ngờ là khá sâu sắc.',
      tags: ['Thế giới mở', 'Sinh tồn', 'Chế tạo', 'Nhiều người chơi'],
      review: {
        text: '“Pokemon có súng”! Còn gì hơn nữa? Trò chơi cực kỳ gây nghiện và mang lại hàng giờ giải trí bất tận cùng bạn bè. Hệ thống xây dựng căn cứ và chế tạo rất tuyệt vời.',
        avatar: 'https://avatars.akamai.steamstatic.com/f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1_medium.jpg',
        author: 'GamerX'
      }
    },
    {
      id: 3,
      title: 'HELLDIVERS™ 2',
      mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/553850/header.jpg',
      description: 'Một game bắn súng góc nhìn thứ ba co-op đầy kịch tính. Hãy lan tỏa dân chủ khắp thiên hà với hỏa lực áp đảo!',
      tags: ['Co-op', 'Bắn súng góc nhìn thứ ba', 'Khoa học viễn tưởng', 'Hành động'],
      review: {
        text: 'Vì Trái Đất Tự Do! Game này mang lại niềm vui thuần túy. Cảm giác gọi pháo kích quỹ đạo để tiêu diệt bầy côn trùng khổng lồ thật sự đã. Chơi cùng bạn bè là hết sảy!',
        avatar: 'https://avatars.akamai.steamstatic.com/e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3_medium.jpg',
        author: 'LibertyPrime'
      }
    },
    {
      id: 4,
      title: 'Stardew Valley',
      mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg',
      description: 'Trò chơi mô phỏng nông trại và cuộc sống đỉnh cao. Thoát khỏi phố thị, về vùng quê và xây dựng cuộc sống mới.',
      tags: ['Mô phỏng nông trại', 'Mô phỏng cuộc sống', 'Đồ họa Pixel', 'Thư giãn'],
      review: {
        text: 'Game hoàn hảo để thư giãn sau một ngày dài. Luôn có việc để làm: trồng trọt, câu cá, khai thác mỏ hoặc xây dựng mối quan hệ với dân làng. Một kiệt tác thật sự.',
        avatar: 'https://avatars.akamai.steamstatic.com/d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2_medium.jpg',
        author: 'CozyGamer'
      }
    }
  ];

  constructor() { }

  ngOnInit(): void { }
  
  ngAfterViewInit(): void { }

  scroll(direction: 'left' | 'right'): void {
    if (this.carousel) {
      const scrollAmount = this.carousel.nativeElement.clientWidth * 0.8;
      this.carousel.nativeElement.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}
