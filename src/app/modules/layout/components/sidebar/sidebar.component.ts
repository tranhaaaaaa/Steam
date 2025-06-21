// app/modules/layout/components/sidebar/sidebar.component.ts
import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { RolepermissionService } from 'src/app/core/services/rolepermission.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [NgClass, AngularSvgIconModule, NgIf, SidebarMenuComponent],
})
export class SidebarComponent implements OnInit {
  public appJson: any = packageJson;
  public isAdmin : boolean = false;
  constructor(public menuService: MenuService,
    private rolepermission : RolepermissionService
  ) {
    if(this.rolepermission.hasRole(["Admin"])){
      this.isAdmin = true;
    }
  }


  ngOnInit(): void {

    console.log(this.isAdmin);
  }

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
}