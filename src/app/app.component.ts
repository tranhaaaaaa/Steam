import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { UserLogged } from './core/utils/userLogged';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster],
})
export class AppComponent {
  title = 'Angular Tailwind';
public userLogged = new UserLogged();
  constructor(public themeService: ThemeService,
    private route: Router
  ) {
    //  if(!this.userLogged.isLogged()){
    //   this.route.navigate(['/auth/sign-in']);
    }
  }

