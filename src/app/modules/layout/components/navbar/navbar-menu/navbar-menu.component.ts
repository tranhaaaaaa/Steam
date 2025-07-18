import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { NavbarSubmenuComponent } from '../navbar-submenu/navbar-submenu.component';
import { Router } from '@angular/router';
import { UserLogged } from 'src/app/core/utils/userLogged';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css'],
  imports: [NgFor, NgClass, NavbarSubmenuComponent,CommonModule],
})
export class NavbarMenuComponent implements OnInit {
  private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];
  private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];
  public userLogged = new UserLogged();
  public isLogin = false;
  constructor(public menuService: MenuService,
    private router: Router
  ) {
    if(this.userLogged.isLogged()){
      this.isLogin = true;
    }
  }

  ngOnInit(): void {}

  onRegisterpage(){
    this.router.navigate(['auth/sign-up']);
  }
  public toggleMenu(menu: MenuItem): void {
    menu.selected = !menu.selected;
  }
onloginPage(){
    this.router.navigate(['auth/sign-in']);
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
