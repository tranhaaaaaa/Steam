
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-family-management',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './family-management.component.html',
  styleUrls: ['./family-management.component.css']
})
export class FamilyManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}