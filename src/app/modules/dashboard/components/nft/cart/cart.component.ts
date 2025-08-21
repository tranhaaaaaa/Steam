import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart, GameInfor } from 'src/app/core/models/db.model';
import { MenuItem } from 'src/app/core/models/menu.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { GameService } from 'src/app/core/services/game.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ThreadService } from 'src/app/core/services/thread.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { NavbarSubmenuComponent } from 'src/app/modules/layout/components/navbar/navbar-submenu/navbar-submenu.component';
import { MenuService } from 'src/app/modules/layout/services/menu.service';

@Component({
  selector: 'app-cart',
     imports: [NgFor, NgClass, NavbarSubmenuComponent,FormsModule,CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];
  private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];
  public listCart : Cart[] = [];
  public listGames : GameInfor[] = [];
   totalPrice: number = 0;
   public userLogged = new UserLogged();
   public cartWithGames: any[] = [];
   public odId : any;
   public total : any;
  constructor(public menuService: MenuService,
    private router : Router,
    private cartService : CartService,
    private gameService : GameService,
    private toastrService : ToastrService,
    private authService : AuthService,
    private threadService : ThreadService,
    private paymentService : PaymentService,
    private walletService : WalletService
  ) {}
isPaymentDialogOpen = false;
isPaymentDialogOpen2 = false;


  // Mở dialog thanh toán
  openPaymentDialog(): void {
  if(this.listCart.length < 1){
    this.toastrService.warning('Giỏ hàng trống');
  }else{
    this.isPaymentDialogOpen = true;
  }
  }

  // Đóng dialog thanh toán
  closePaymentDialog(): void {
    this.isPaymentDialogOpen = false;
  }
  openPaymentDialog2(): void {
    this.isPaymentDialogOpen2 = true;
  }

  // Đóng dialog thanh toán
  closePaymentDialog2(): void {
    this.isPaymentDialogOpen2 = false;
  }

  // Thanh toán bằng VNPay
  payWithVNPay(): void {
    console.log('Thanh toán bằng VNPay');
     this.onPayment(1);
   
    this.closePaymentDialog(); 
    // this.openPaymentDialog2();
    
  }

  // Thanh toán bằng MoMo
  payWithWallet(): void {
    console.log('Thanh toán bằng MoMo');
    this.onPayment(2);
    let formData = {
      orderId : this.odId.toString(),
      amount : this.total
    }
    // this.paymentService.paymentMomo(formData).subscribe((data ) => {
    //     this.router.navigate([data.]);
    // })
    this.closePaymentDialog(); // Đóng dialog sau khi chọn
    // Bạn có thể gọi API hoặc điều hướng đến trang thanh toán MoMo ở đây
  }
  ngOnInit(): void {
    this.onGetData();
  
  }
 onGetData() {
    this.cartService.getListCart().subscribe(data => {
      this.listCart = data.data.filter((x:any)=> x.UserId == this.userLogged.getCurrentUser().userId); 
      this.mapCartToGameDetails(); 
      console.log(this.listCart);
    });
  }

  mapCartToGameDetails() {
    this.totalPrice = 0;
      this.gameService.getListGame().subscribe(data => {
    this.listGames = data.data;
    this.cartWithGames = this.listCart.map(cartItem => {
      const gameDetails = this.listGames.find((game: any) => game.Id == cartItem.GameId);
      return {
        ...cartItem,  
        gameDetails: gameDetails  
      };
    });
    console.log(this.cartWithGames);
    for (let index = 0; index < this.cartWithGames.length; index++) {
      const element = this.cartWithGames[index].gameDetails;
      this.totalPrice += element.Price * (1 - element.Discounts[0].value / 100);
    }
  });
  }
  
onPayment(type: number) {
  const userId = this.userLogged.getCurrentUser().userId;

  // Tính toán tổng giá trị
  let totalAmount = 0;
  for (let i = 0; i < this.cartWithGames.length; i++) {
    totalAmount += this.cartWithGames[i].gameDetails.Price;
  }

  // Lấy thời gian hiện tại
  const currentDate = new Date().toISOString();

  // Cấu trúc thông tin đơn hàng
  const orderInfo = {
    id: 0, // Đây là id tự động của đơn hàng, có thể được tạo khi lưu vào cơ sở dữ liệu
    userID: userId,
    totalAmount: totalAmount,
    status: "Pending", 
  };
  this.threadService.oreder(orderInfo).subscribe(orderResponse => {
    const orderDetails = this.cartWithGames.map(item => ({
    id: 0, // ID tự động của chi tiết đơn hàng
    orderID: orderResponse.data.id, // Đặt ID đơn hàng cho các chi tiết này
    gameID: item.gameDetails.Id,
    unitPrice: item.gameDetails.Price,
    createdAt: currentDate
  }));
       this.odId = orderResponse.data.id;
       this.total = totalAmount;
    orderDetails.forEach(detail => {
      this.threadService.orederdetail(detail).subscribe(() => {

      });
    });
      if(type == 1){
         let formData = {
      orderId : this.odId,
      amount : totalAmount
    }
    this.paymentService.paymentCreate(formData).subscribe((data ) => {
           window.open(data.paymentUrl, '_blank');
             this.deleteAll();
             this.onGetData();
            this.closePaymentDialog();
    })
      }else{
        let form = {
           orderId : this.odId
        }
        this.walletService.paymentWallet(form).subscribe((data ) => {
          this.toastrService.success("Thanh toán bằng ví thành công!");
             this.deleteAll();
             this.onGetData();
            this.closePaymentDialog();

        },
        error => {
          this.toastrService.error('Có lỗi xảy ra, hãy kiểm tra số dư!','Thất bại!');})
          
      }

  });
}

  addToCart(gameId: any) {
    let formData = {
      userID : this.userLogged.getCurrentUser().userId,
      gameID : gameId
    }
    this.cartService.addToCart(formData).subscribe(data => {
       this.authService.triggerNotificationAction();
      this.toastrService.success("Thêm game vào giỏ hàng thành công");
      this.onGetData();
    })
  }
  delete(cartid : any){
    this.cartService.DeleteCart(cartid).subscribe(()=>{
      this.onGetData();
       this.authService.triggerNotificationAction();
      this.toastrService.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
    })
  }
  deleteAll(){
    for (let index = 0; index < this.listCart.length; index++) {
      const element = this.listCart[index];
      if(element.UserId == this.userLogged.getCurrentUser().userId){
        this.cartService.DeleteCart(element.Id).subscribe(()=>{
          this.onGetData();
           this.authService.triggerNotificationAction();
        })
      }
      
    }
  }
 public static pages2: MenuItem[] = [
    
    {
      group: 'Your Store',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Home',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Community Recommendations', 
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Recently Viewed',
          route: '/users',
        },
      ],
    },
    {
      group: 'New & Noteworthy',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Top Seller',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Most Played', 
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Recently Update',
          route: '/users',
        },
      ],
    },
    {
      group: 'Categories',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Free to play',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Early access', 
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Steam deak',
          route: '/users',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Greate on Deck',
          route: '/users',
        },
      ],
    },
    {
      group: 'Points Shop',
      separator: false,
      items: [ ],
    },
    {
      group: 'News',
      separator: false,
      items: [ ],
    },
    {
      group: 'Labs',
      separator: false,
      items: [ ],
    },
  ];
  public toggleMenu(menu: MenuItem): void {
    menu.selected = !menu.selected;
  }

  public mouseEnter(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.hideMenuClass.forEach((c) => element.classList.remove(c));
      this.showMenuClass.forEach((c) => element.classList.add(c));
    }
  }
  onDashbroad(){
    this.router.navigate(['/dashboard/nfts']);
  }
  public mouseLeave(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.showMenuClass.forEach((c) => element.classList.remove(c));
      this.hideMenuClass.forEach((c) => element.classList.add(c));
    }
  }
}

