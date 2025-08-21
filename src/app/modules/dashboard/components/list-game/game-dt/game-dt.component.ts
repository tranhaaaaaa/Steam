
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { GameService } from 'src/app/core/services/game.service';
import { GameInfor, Review } from 'src/app/core/models/db.model';
import { ThreadService } from 'src/app/core/services/thread.service';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';


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
  imports: [CommonModule,FormsModule],
  templateUrl: './game-dt.component.html',
  styleUrls: ['./game-dt.component.css']
})
export class GameDtComponent implements OnInit {
sanitizedMediaUrl!: SafeResourceUrl;
  selectedMedia: any;
  userLogged = new UserLogged();
  public listReview : Review[] = [];

  showAddToCartDialog = false;
  comment : any;
  public gameDetail = new GameInfor();
  public idgame : any;
  // NEW: Inject các service cần thiết cho giỏ hàng
  constructor(
    private cartService: CartService,
    private toastService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private threadService : ThreadService,
    private gameService : GameService,
    private wishlistService : WishlistService
  ) { 
    this.idgame = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.onGetData();
  }
  onGetData(){
     this.gameService.getGameDetail(this.idgame).subscribe(res => {
      this.gameDetail = res.data;
      console.log("this.gameDetail",this.gameDetail);
      this.selectedMedia = this.gameDetail.Media[0];
         this.gameService.getGameDiscountId(this.idgame).subscribe(resdiscount => {
  
         })
    });
    this.threadService.getListReviewByGameId(this.idgame).subscribe(res => {
      this.listReview = res.data;
    console.log("resdiscount",this.listReview);
    })
  }
    sendComment(){
      let formData={
        gameID : this.idgame,
        userID : this.userLogged.getCurrentUser().userId,
        startCount : 5,
        comment : this.comment,
        createdAt : new Date()
      }
      this.gameService.createGameReview(formData).subscribe(res => {
          this.onGetData();
          this.comment = "";
      })
    }
selectMedia(mediaItem: any): void {
  if (mediaItem.MediaType === 'video') {
    this.sanitizedMediaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mediaItem.MediaURL);
  }
  this.selectedMedia = mediaItem;
}


download(game: GameInfor) {
  window.open(game.InstallerFilePath, '_blank');
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
  onAddwishlist(){
    this.wishlistService.addGameTowishlist(this.userLogged.getCurrentUser().userId,(this.idgame)).subscribe((res:any) => {
     this.toastService.success("Thêm vào danh sách thích","Thành công");
    })
  }
}