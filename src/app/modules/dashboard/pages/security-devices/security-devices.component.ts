// src/app/modules/dashboard/pages/security-devices/security-devices.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface AuthorizedDevice {
  type: 'Web browser' | 'PC Steam Client' | 'Mobile device';
  name: string;
  lastActive: string;
  location: string;
  isCurrentDevice?: boolean;
  isNew?: boolean;
  isSignedOut?: boolean;
}

@Component({
  selector: 'app-security-devices',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './security-devices.component.html',
  styleUrls: ['./security-devices.component.css']
})
export class SecurityDevicesComponent implements OnInit {

  activeDevices: AuthorizedDevice[] = [
    { type: 'Web browser', name: 'Brave on Windows', lastActive: '', location: 'Hanoi, VN', isCurrentDevice: true },
    { type: 'PC Steam Client', name: 'Admin-PC', lastActive: '', location: 'Hanoi, VN' }
  ];

  recentlySeenDevices: AuthorizedDevice[] = [
    { type: 'Web browser', name: 'Brave on Windows', lastActive: '9 hours ago', location: 'Hanoi, VN', isNew: true },
    { type: 'Web browser', name: 'Brave on Windows', lastActive: '2 days ago', location: 'Hanoi, VN', isNew: true },
    { type: 'Web browser', name: 'Chrome on Windows', lastActive: '5 days ago', location: 'Hanoi, VN' },
    { type: 'PC Steam Client', name: 'FPS-15', lastActive: '3 weeks ago - Signed out', location: 'Thu Dau Mot, VN', isSignedOut: true },
    { type: 'PC Steam Client', name: 'DESKTOP-MUUUEFA', lastActive: '4 weeks ago', location: 'Hanoi, VN' },
    { type: 'PC Steam Client', name: 'LAPTOP-R8K3TV01', lastActive: '5 weeks ago', location: 'Thai Nguyen, VN' },
    { type: 'Mobile device', name: 'iPhone16,2', lastActive: '2 months ago', location: 'Haiphong, VN' },
  ];

  signedOutDevices: AuthorizedDevice[] = [
    { type: 'PC Steam Client', name: 'DESKTOP-1AQ9RSD', lastActive: '2 months ago', location: 'Hanoi, VN' }
  ];

  constructor() { }

  ngOnInit(): void { }

  getDeviceIcon(type: AuthorizedDevice['type']): string {
    switch (type) {
      case 'Web browser':
        return 'assets/icons/heroicons/outline/globe-alt.svg';
      case 'PC Steam Client':
        return 'assets/icons/heroicons/outline/computer-desktop.svg';
      case 'Mobile device':
        return 'assets/icons/heroicons/outline/device-phone-mobile.svg';
      default:
        return 'assets/icons/heroicons/outline/question-mark-circle.svg';
    }
  }
}