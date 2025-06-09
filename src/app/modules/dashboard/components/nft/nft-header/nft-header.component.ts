import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/core/models/menu.model';
import { UserLogged } from 'src/app/core/utils/userLogged';
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
  public userLogged = new UserLogged();
  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

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

