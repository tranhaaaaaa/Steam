
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { GameService } from 'src/app/core/services/game.service';
import { GameInfor } from 'src/app/core/models/db.model';


@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-game-dt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-dt.component.html',
  styleUrls: ['./game-dt.component.css']
})
export class GameDtComponent implements OnInit {

  selectedMedia: any;
  userLogged = new UserLogged();


  showAddToCartDialog = false;


  game = {
    id: 1627720, 
    title: 'Lies of P',
    description: 'Lies of P is a thrilling soulslike that takes the story of Pinocchio, turns it on its head, and sets it against the darkly elegant backdrop of the Belle Epoque era.',
    mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/header.jpg?t=1701916187',
    media: [
      { type: 'video', url: 'https://www.youtube.com/embed/opu4T76MUps?autoplay=1&mute=1', thumbnailUrl: 'https://i.ytimg.com/vi/opu4T76MUps/hqdefault.jpg' },
      { type: 'image', url: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/ss_0a93756b553b4481f084666359b37849c7cc72f1.600x338.jpg' },
      { type: 'image', url: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/ss_d830f3a38f712757271b86c8782705a221d1193d.600x338.jpg' },
      { type: 'image', url: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/ss_8f0b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b.600x338.jpg' },
      { type: 'image', url: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/ss_4e6984d7a8b8c5c8e8f8f8f8f8f8f8f8f8f8f8f8.600x338.jpg' },
    ],
    tags: ['Dark Souls', 'Hành động', 'Kỳ ảo u ám', 'Đen tối'],
    reviews: {
      recent: 'Rất tích cực',
      recentCount: '1,709',
      all: 'Rất tích cực',
      allCount: '39,594'
    },
    releaseDate: '18 Thg09, 2023',
    developer: 'NEOWIZ',
    publisher: 'NEOWIZ',
    price: '525.000₫',
    discount: 50,
    originalPrice: '1.050.000₫'
  };
  public gameDetail = new GameInfor();
  public idgame : any;
  // NEW: Inject các service cần thiết cho giỏ hàng
  constructor(
    private cartService: CartService,
    private toastService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private gameService : GameService
  ) { 
    this.idgame = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
     this.selectedMedia = this.game.media[0];
    this.gameService.getGameDetail(this.idgame).subscribe(res => {
      this.gameDetail = res.data;
      console.log("this.gameDetail",this.gameDetail);
      this.selectedMedia = this.gameDetail.Media[0];
         this.gameService.getGameDiscountId(this.idgame).subscribe(resdiscount => {
          console.log("resdiscount",resdiscount);
         })
    });
  }

  selectMedia(mediaItem: any): void {
    this.selectedMedia = mediaItem;
  }




  addToCart(gameId: number): void {
    if (this.userLogged.isLogged()) {
      const formData = {
        userID: this.userLogged.getCurrentUser().userId,
        gameID: gameId
      };
      this.cartService.addToCart(formData).subscribe({
        next: () => {
          this.authService.triggerNotificationAction(); // Cập nhật icon giỏ hàng
          this.showAddToCartDialog = true; 
        },
        error: (err) => {
          this.toastService.error('Thêm vào giỏ hàng thất bại. Vui lòng thử lại.', 'Lỗi');
          console.error(err);
        }
      });
    } else {
      this.toastService.info('Vui lòng đăng nhập để mua hàng.');
      this.router.navigate(['/auth/sign-in']);
    }
  }

  closeAddToCartDialog(): void {
    this.showAddToCartDialog = false;
  }

  continueShopping(): void {
    this.closeAddToCartDialog();
  }

  viewCart(): void {
    this.closeAddToCartDialog();
    this.router.navigate(['/dashboard/cart']);
  }
}