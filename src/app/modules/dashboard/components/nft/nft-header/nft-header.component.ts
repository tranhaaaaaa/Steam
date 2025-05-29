import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/core/models/menu.model';
import { NavbarSubmenuComponent } from 'src/app/modules/layout/components/navbar/navbar-submenu/navbar-submenu.component';
import { MenuService } from 'src/app/modules/layout/services/menu.service';

@Component({
    selector: 'app-nft-header',
    templateUrl: './nft-header.component.html',
    standalone: true,
      imports: [NgFor, NgClass, NavbarSubmenuComponent],
})
export class NftHeaderComponent implements OnInit {
  private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];
  private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}
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

  public mouseLeave(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.showMenuClass.forEach((c) => element.classList.remove(c));
      this.hideMenuClass.forEach((c) => element.classList.add(c));
    }
  }
}

