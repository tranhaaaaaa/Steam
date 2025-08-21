import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ThemeService } from '../../../../../core/services/theme.service';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart, Wallet } from 'src/app/core/models/db.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { RolepermissionService } from 'src/app/core/services/rolepermission.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css'],
  imports: [CommonModule,ClickOutsideDirective, AngularSvgIconModule, RouterLink],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class ProfileMenuComponent implements OnInit {
  public isOpen = false;
  cartItemCount = 0;
  public userLogged = new UserLogged()
  public isLogin = false;
  public img = '';
  public username = '';
  public myWallet = new Wallet()
  public listCart : Cart[]=[];
  email: any;

openCart() {
 this.router.navigate(['/dashboard/cart']);
}

  public profileMenu = [
    {
      title: 'Your Profile',
      icon: './assets/icons/heroicons/outline/user-circle.svg',
      link: '/profile',
    },
    {
      title: 'Settings',
      icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
      link: '/settings',
    },
    {
      title: 'Log out',
      icon: './assets/icons/heroicons/outline/logout.svg',
      link: '/auth',
    },
  ];

  public themeColors = [
    {
      name: 'base',
      code: '#e11d48',
    },
    {
      name: 'yellow',
      code: '#f59e0b',
    },
    {
      name: 'green',
      code: '#22c55e',
    },
    {
      name: 'blue',
      code: '#3b82f6',
    },
    {
      name: 'orange',
      code: '#ea580c',
    },
    {
      name: 'red',
      code: '#cc0022',
    },
    {
      name: 'violet',
      code: '#6d28d9',
    },
  ];
  isAdmin = false;
  public themeMode = ['light', 'dark'];
  public themeDirection = ['ltr', 'rtl'];

  constructor(public themeService: ThemeService,
    private router: Router,
    private cartService : CartService,
    private authService : AuthService,
    private userService : UserService,
    private permissionService : RolepermissionService
  ) {
     if(this.userLogged.isLogged()){
      this.isLogin = true;
      // this.username = this.userLogged.getCurrentUser().username;
     this.userService.getUserById(this.userLogged.getCurrentUser().userId).subscribe((data) => {
       this.email = data.data[0].Email;
       this.username = data.data[0].displayName;
       this.img = data.data[0].profilePicture;
     });
     this.userService.wallet().subscribe((data) => {
       this.myWallet = data.data;
       console.log("myWallet",this.myWallet);
     })
      }
      if(this.permissionService.hasRole(["Admin"]) || this.permissionService.hasRole(["Staff"])){this.isAdmin = true}
  }
onRegisterpage(){
    this.router.navigate(['auth/sign-up']);
  }

onloginPage(){
    this.router.navigate(['auth/sign-in']);
}
  ngOnInit(): void {
      this.cartService.getListCart().subscribe((data) =>{
        this.listCart = data.data.filter((x:any)=> x.UserId == this.userLogged.getCurrentUser().userId);
        this.cartItemCount = this.listCart.length;
    });
    
      this.authService.notificationAction$.subscribe(() => {
      this.handleNotificationAction();
    });
    
  }
handleNotificationAction(){
   console.log('Hành động thông báo đã được thực hiện!');
  this.cartService.getListCart().subscribe((data) =>{
        this.listCart = data.data.filter((x:any)=> x.UserId == this.userLogged.getCurrentUser().userId);
        this.cartItemCount = this.listCart.length;
    })
}
  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  
  }

  toggleThemeMode() {
    this.themeService.theme.update((theme) => {
      const mode = !this.themeService.isDark ? 'dark' : 'light';
      return { ...theme, mode: mode };
    });
  }
   logout(){
    this.userLogged.logout()
  //  this.router.navigate(['/auth/sign-in'])
    window.location.href = '/auth/sign-in'
  }
     history(){
    // this.userLogged.logout()
  //  this.router.navigate(['/auth/sign-in'])
    window.location.href = '/dashboard/game-buyed'
  }
  toggleThemeColor(color: string) {
    this.themeService.theme.update((theme) => {
      return { ...theme, color: color };
    });
  }

  setDirection(value: string) {
    this.themeService.theme.update((theme) => {
      return { ...theme, direction: value };
    });
  }
}
