import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameInfor } from 'src/app/core/models/db.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { GameService } from 'src/app/core/services/game.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Component({
  selector: 'app-game-dt',
  imports: [CommonModule],
  templateUrl: './game-dt.component.html',
  styleUrl: './game-dt.component.css'
})
export class GameDtComponent implements OnInit {
  public gameDetail: GameInfor | undefined;
   showAddToCartDialog: boolean = false; 
  public listGame : GameInfor[] = [];
  public userLogged = new UserLogged();
  constructor(private route: ActivatedRoute, private service: GameService,
    private cartService : CartService,
    private toastService : ToastrService,
    private authService : AuthService,
    private router : Router
  ) {}

  ngOnInit(): void {
    const gameId = +this.route.snapshot.paramMap.get('id')!;
    this.service.getGameDetail(gameId).subscribe(data => {
      this.gameDetail = data.data;
      console.log(this.gameDetail);
    });
    this.service.getListGame().subscribe(data => {
      this.listGame = data.data;
      console.log(this.listGame);
    })
  }
  addToCart(gameId: any) {
         if(this.userLogged.isLogged()){
           let formData = {
            userID : this.userLogged.getCurrentUser().userId,
            gameID : gameId
          }
          this.cartService.addToCart(formData).subscribe(data => {
            this.authService.triggerNotificationAction();
            this.toastService.success("Thêm game vào giỏ hàng thành công");
          })
         }
         else{
          this.router.navigate(['/auth/sign-in']);
         }
        
  }
   openAddToCartDialog(gameId : any) {
    if(this.userLogged.isLogged()){
       this.showAddToCartDialog = true;
           let formData = {
            userID : this.userLogged.getCurrentUser().userId,
            gameID : gameId
          }
          this.cartService.addToCart(formData).subscribe(data => {
            this.authService.triggerNotificationAction();
            this.toastService.success("Thêm game vào giỏ hàng thành công");
          })
         }
         else{
          this.router.navigate(['/auth/sign-in']);
         }
   
  }

  // Đóng dialog
  closeAddToCartDialog() {
    this.showAddToCartDialog = false;
  }

  continueShopping() {
    // this.router.navigate(['/dashboard/cart'])

    this.closeAddToCartDialog();
  }

  // Xem giỏ hàng
  viewCart() {
    this.router.navigate(['/dashboard/cart'])

    this.closeAddToCartDialog();
    // Điều hướng tới giỏ hàng
  }
}
