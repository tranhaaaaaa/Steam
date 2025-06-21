// app/modules/layout/services/menu.service.ts
import { Injectable, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/core/constants/menu';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
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

  private _subscription = new Subscription();
  private _subscription2 = new Subscription();
  private _subscription3 = new Subscription();
  private userLogged = new UserLogged();
  constructor(private router: Router) {
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
            label: 'Quản lý hệ thống',
            route: '/dashboard/system',
          },
         
        ],
      // },
      // {
      //   group: 'INTERFACE',
      //   separator: true,
      //   items: [
      //     {
      //       icon: 'assets/icons/heroicons/outline/keyboard.svg',
      //       label: 'Keyboards',
      //       route: '/keyboards',
      //     },
      //     {
      //       icon: 'assets/icons/heroicons/outline/play.svg',
      //       label: 'Startup Movies',
      //       route: '/startup-movies',
      //     },
      //   ],
      // },
      // {
      //   group: 'PROFILE',
      //   separator: true,
      //   items: [
      //     {
      //       icon: 'assets/icons/heroicons/outline/user-circle.svg',
      //       label: 'Avatars',
      //       route: '/avatars',
      //     },
      //     {
      //       icon: 'assets/icons/heroicons/outline/photo.svg',
      //       label: 'Backgrounds',
      //       route: '/backgrounds',
      //     },
      //     {
      //       icon: 'assets/icons/heroicons/outline/trophy.svg',
      //       label: 'Community Awards',
      //       route: '/community-awards',
      //     },
      //     {
      //       icon: 'assets/icons/heroicons/outline/star.svg',
      //       label: 'Seasonal Badge',
      //       route: '/seasonal-badge',
      //     },
      //     {
      //       icon: 'assets/icons/heroicons/outline/identification.svg',
      //       label: 'Game Profiles',
      //       route: '/game-profiles',
      //     },
      //     {
      //       icon: 'assets/icons/heroicons/outline/sparkles.svg',
      //       label: 'Showcases',
      //       route: '/showcases',
      //     },
      //   ],
      // },
      // {
      //   group: 'CHAT',
      //   separator: false,
      //   items: [
      //     {
      //       icon: 'assets/icons/heroicons/outline/gif.svg',
      //       label: 'Animated Stickers',
      //       route: '/animated-stickers',
      //     },
      //     {
      //       icon: 'assets/icons/heroicons/outline/chat-bubble-oval-left.svg',
      //       label: 'Chat Effects',
      //       route: '/chat-effects',
      //     },
      //     {
      //       icon: 'assets/icons/heroicons/outline/face-smile.svg',
      //       label: 'Emoticons',
      //       route: '/emoticons',
      //     },
      //   ],
     },
    ]);

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