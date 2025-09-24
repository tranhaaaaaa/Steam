// app/modules/layout/services/menu.service.ts
import { Injectable, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/core/constants/menu';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { RolepermissionService } from 'src/app/core/services/rolepermission.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnDestroy {
  private _showSidebar = signal(true);
  private _showMobileMenu = signal(false);
  private _pagesMenu = signal<MenuItem[]>([]);
  private _pagesMenu2 = signal<MenuItem[]>([]);
  private _pagesMenu3 = signal<MenuItem[]>([]);
  private isAdmin = false;
  public isStaff = false;
  private _subscription = new Subscription();
  private _subscription2 = new Subscription();
  private _subscription3 = new Subscription();
  private userLogged = new UserLogged();
  constructor(private router: Router,
    private rolePermission : RolepermissionService
  ) {
    if(this.rolePermission.hasRole(["Admin"])){
      this.isAdmin = true;
    }
    if(this.rolePermission.hasRole(["Staff"])){
      this.isStaff = true;
    }
    /** Set dynamic menu */
    this._pagesMenu2.set(Menu.pages2);
    let sub1 = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /** Expand menu base on active route */
        this._pagesMenu2().forEach((menu) => {
          let activeGroup = false;
          menu.items.forEach((subMenu) => {
            const active = this.isActive(subMenu.route);
            subMenu.expanded = active;
            subMenu.active = active;
            if (active) activeGroup = true;
            if (subMenu.children) {
              this.expand(subMenu.children);
            }
          });
          menu.active = activeGroup;
        });
      }
    });
    this._subscription2.add(sub1);

    this._pagesMenu.set(Menu.pages);
    let sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /** Expand menu base on active route */
        this._pagesMenu().forEach((menu) => {
          let activeGroup = false;
          menu.items.forEach((subMenu) => {
            const active = this.isActive(subMenu.route);
            subMenu.expanded = active;
            subMenu.active = active;
            if (active) activeGroup = true;
            if (subMenu.children) {
              this.expand(subMenu.children);
            }
          });
          menu.active = activeGroup;
        });
      }
    });
    this._subscription.add(sub);

    // Steam Points Shop Menu
  if(this.isAdmin){
      this._pagesMenu3.set([
      {
        group: 'Quản trị',
        separator: true,
        items: [
          {
            icon: 'assets/icons/heroicons/outline/home.svg',
            label: 'Quản lý người dùng',
            route: '/dashboard/manager-user',
          },
          {
            icon: 'assets/icons/heroicons/outline/game-controller.svg',
            label: 'Quản lý danh sách game',
            route: '/dashboard/manager-game',
          },
          {
            icon: 'assets/icons/heroicons/outline/calendar.svg',
            label: 'Quản lý danh mục',
            route: '/dashboard/category',
          },
          {
            icon: 'assets/icons/heroicons/outline/calendar.svg',
            label: 'Quản lý hastags',
            route: '/dashboard/hastags',
          },
           {
            icon: 'assets/icons/heroicons/outline/calendar.svg',
            label: 'Quản lý đơn hàng',
            route: '/dashboard/orders',
          },
           {
            icon: 'assets/icons/heroicons/outline/calendar.svg',
            label: 'Quản lý giảm giá',
            route: '/dashboard/discount',
          },
          {
            icon: 'assets/icons/heroicons/outline/calendar.svg',
            label: 'Yêu cầu nạp/rút',
            route: '/dashboard/wallet-request',
          },
          {
            icon: 'assets/icons/heroicons/outline/calendar.svg',
            label: 'Yêu cầu hoàn tiền',
            route: '/dashboard/money-request',
          },
           {
            icon: 'assets/icons/heroicons/outline/game-controller.svg',
            label: 'Game chờ duyệt',
            route: '/dashboard/game-approve',
          },
          //  {
          //   icon: 'assets/icons/heroicons/outline/calendar.svg',
          //   label: 'Quản lý hệ thống',
          //   route: '/dashboard/system',
          // },
         
        ],
    
     },
    ]);
  }else{
     this._pagesMenu3.set([
      {
        group: 'Quản lý',
        separator: true,
        items: [
         
          {
            icon: 'assets/icons/heroicons/outline/game-controller.svg',
            label: 'Danh sách game tải lên',
            route: '/dashboard/manager-game',
          },
          
          
          
           {
            icon: 'assets/icons/heroicons/outline/calendar.svg',
            label: 'Quản lý giảm giá',
            route: '/dashboard/discount',
          },
          {
            icon: 'assets/icons/heroicons/outline/calendar.svg',
            label: 'Quản lý danh mục',
            route: '/dashboard/category',
          },
           {
            icon: 'assets/icons/heroicons/outline/game-controller.svg',
            label: 'Game chờ duyệt',
            route: '/dashboard/game-approve',
          },
          {
            icon: 'assets/icons/heroicons/outline/calendar.svg',
            label: 'Quản lý hastags',
            route: '/dashboard/hastags',
          },
           {
            icon: 'assets/icons/heroicons/outline/calendar.svg',
            label: 'Quản lý đơn hàng',
            route: '/dashboard/orders',
          },
           
         
        ],
    
     },
    ]);
     }
  

    let sub3 = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /** Expand menu base on active route */
        this._pagesMenu3().forEach((menu) => {
          let activeGroup = false;
          menu.items.forEach((subMenu) => {
            const active = this.isActive(subMenu.route);
            subMenu.expanded = active;
            subMenu.active = active;
            if (active) activeGroup = true;
            if (subMenu.children) {
              this.expand(subMenu.children);
            }
          });
          menu.active = activeGroup;
        });
      }
    });
    this._subscription3.add(sub3);
  }

  get showSideBar() {
    return this._showSidebar();
  }
  get showMobileMenu() {
    return this._showMobileMenu();
  }
  get pagesMenu() {
    return this._pagesMenu();
  }
  get pagesMenu2() {
    return this._pagesMenu2();
  }
  get pagesMenu3() {
    return this._pagesMenu3();
  }
  set showSideBar(value: boolean) {
    this._showSidebar.set(value);
  }
  set showMobileMenu(value: boolean) {
    this._showMobileMenu.set(value);
  }

  public toggleSidebar() {
    this._showSidebar.set(!this._showSidebar());
  }

  public toggleMenu(menu: any) {
    this.showSideBar = true;
    menu.expanded = !menu.expanded;
  }

  public toggleSubMenu(submenu: SubMenuItem) {
    submenu.expanded = !submenu.expanded;
  }

  private expand(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = this.isActive(item.route);
      if (item.children) this.expand(item.children);
    });
  }

  public isActive(instruction: any): boolean {
    return this.router.isActive(this.router.createUrlTree([instruction]), {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._subscription2.unsubscribe();
    this._subscription3.unsubscribe();
  }
}