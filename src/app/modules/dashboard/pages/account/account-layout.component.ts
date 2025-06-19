// src/app/modules/dashboard/pages/account/account-layout.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UserLogged } from 'src/app/core/utils/userLogged';

interface AccountSidebarItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-account-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AngularSvgIconModule],
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.css']
})
export class AccountLayoutComponent implements OnInit {
  public userLogged = new UserLogged();
  username: any;
  sidebarItems: AccountSidebarItem[] = [
    { label: 'Account details', route: './details' },
    { label: 'Store preferences', route: './store-preferences' },
    { label: 'Family Management', route: './family-management' },
    { label: 'Security & Devices', route: './security' },
    { label: 'Language Preferences', route: './language' },
    { label: 'Cookies & Browsing', route: './cookies' },
    { label: 'Notification Settings', route: './notifications' },
    { label: 'Gated Access Games', route: './gated-access' },
  ];

  constructor() { }

  ngOnInit(): void {
this.username = this.userLogged.getCurrentUser().username;
   }
}