// src/app/modules/dashboard/pages/account/account-details.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}