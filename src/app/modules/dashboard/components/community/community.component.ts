import { Component } from '@angular/core';
import { CommunityHeaderComponent } from '../community-header/community-header.component';
import { Router } from '@angular/router';
import { UserLogged } from 'src/app/core/utils/userLogged';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community',
  imports: [CommunityHeaderComponent,CommonModule],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {
  public userLogged = new UserLogged();
  public isLog = false;
constructor(private router : Router) 
{
  if(this.userLogged.isLogged()){
    this.isLog = true;
  }
}

onClick(){
  this.router.navigate(['/auth/sign-in']);
}
}
