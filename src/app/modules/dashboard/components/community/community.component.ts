import { Component } from '@angular/core';
import { CommunityHeaderComponent } from '../community-header/community-header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community',
  imports: [CommunityHeaderComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {
constructor(private router : Router) {}

onClick(){
  this.router.navigate(['/auth/sign-in']);
}
}
