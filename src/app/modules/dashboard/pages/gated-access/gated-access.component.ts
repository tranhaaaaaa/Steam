import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gated-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gated-access.component.html',
  styleUrls: ['./gated-access.component.css']
})
export class GatedAccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}