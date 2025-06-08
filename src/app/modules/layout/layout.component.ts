// app/modules/layout/layout.component.ts
import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// SidebarComponent không cần thiết nên có thể xóa dòng import này
// import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  // Xóa SidebarComponent khỏi mảng imports
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // ...
}