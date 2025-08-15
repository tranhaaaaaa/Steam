import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { G } from '@angular/material/common-module.d-C8xzHJDr';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameInfor, User } from 'src/app/core/models/db.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule,FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  listWishlist : User = new User();
  public userLogged = new UserLogged();
  showAddToCartDialog : boolean = false;
    public selectedGame?: GameInfor;
    public isModalOpen = false;
  constructor(private wishlistService : WishlistService,
    private cartService : CartService,
    private authService : AuthService,
    private toastService : ToastrService,
    private router : Router
  ) { }
  ngOnInit(): void {
    this.wishlistService.getWishList().subscribe((res:any) => {
      var x = res.data.filter((x:any) => x.Id == this.userLogged.getCurrentUser().userId);
     this.listWishlist = x[0]
    })
  }
  openModal(game: GameInfor) {
    this.selectedGame = game;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedGame = undefined;
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
