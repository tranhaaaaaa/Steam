
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-store-preferences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule],
  templateUrl: './store-preferences.component.html',
  styleUrls: ['./store-preferences.component.css']
})
export class StorePreferencesComponent implements OnInit {

  preferencesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.preferencesForm = this.fb.group({
      // Mature Content
      generalMature: [true],
      frequentViolence: [true],
      someNudity: [true],
      frequentNudity: [false],
      adultOnly: [false],
      // Product Types
      showEarlyAccess: [true],
      showPrePurchase: [true],
      showSoftware: [true],
      showVideos: [true],
      showNotInMyLanguages: [false],
      showVR: [true],
      // Tags to Exclude
      excludedTagInput: [''],
      // Ignored Products
      // Review Score
      excludeOffTopic: [true],
      // Search Options
      hideInLibrary: [false],
      hideOnWishlist: [true],
      enableInfiniteScroll: [true],
      // Language Preferences
      chatFilter: ['strong'],
      filterTextFromFriends: [true],
      // Platform Preferences
      windows: [true],
      macOS: [true],
      steamOSLinux: [true],
      // Steam Deck
      askForFeedback: [true],
      // Broadcast
      hideLiveBroadcasts: [false]
    });
  }

  ngOnInit(): void {
    // Log form value changes for debugging
    this.preferencesForm.valueChanges.subscribe(value => {
      console.log('Preferences Form Changed:', value);
    });
  }

  addTag() {
    const tag = this.preferencesForm.get('excludedTagInput')?.value;
    if (tag) {
      console.log('Adding tag:', tag);
      // Logic to add tag to a list would go here
      this.preferencesForm.get('excludedTagInput')?.reset();
    }
  }
}