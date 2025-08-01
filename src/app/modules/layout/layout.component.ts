// app/modules/layout/layout.component.ts
import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { RolepermissionService } from 'src/app/core/services/rolepermission.service';
// SidebarComponent không cần thiết nên có thể xóa dòng import này
// import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  // Xóa SidebarComponent khỏi mảng imports
  imports: [NavbarComponent, RouterOutlet, FooterComponent,CommonModule,SidebarComponent],
})
export class LayoutComponent implements OnInit {
  public isLog = false;
  public userLogged = new UserLogged();
  public isAdmin :boolean = false;
  constructor(private permission : RolepermissionService){
    if(this.userLogged.isLogged()){
      this.isLog = true;
    }
    if(this.permission.hasRole(["Admin"]) || this.permission.hasRole(["Staff"])){
      this.isAdmin = true;
    }
  }
  ngOnInit(): void {
  }
  // ...
}