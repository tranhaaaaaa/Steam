// src/app/modules/dashboard/pages/language-preferences/language-preferences.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-preferences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './language-preferences.component.html',
  styleUrls: ['./language-preferences.component.css']
})
export class LanguagePreferencesComponent implements OnInit {

  languageForm: FormGroup;

  primaryLanguages = ['English', 'Vietnamese', 'French', 'German', 'Spanish - Spain'];

  secondaryLanguages = [
    'Bulgarian', 'Czech', 'Danish', 'Dutch', 'English', 'Finnish', 'French', 'German', 'Greek', 'Hungarian',
    'Indonesian', 'Italian', 'Japanese', 'Korean', 'Norwegian', 'Polish', 'Portuguese - Brazil', 'Portuguese - Portugal',
    'Romanian', 'Russian', 'Simplified Chinese', 'Spanish - Latin America', 'Spanish - Spain', 'Swedish', 'Thai',
    'Traditional Chinese', 'Turkish', 'Ukrainian', 'Vietnamese'
  ];

  additionalLanguages = [
    'Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Armenian', 'Assamese', 'Azerbaijani', 'Bangla', 'Basque',
    'Belarusian', 'Bosnian', 'Catalan', 'Cherokee', 'Croatian', 'Dari', 'Estonian', 'Filipino', 'Galician',
    'Georgian', 'Gujarati', 'Hausa', 'Hebrew', 'Hindi', 'Icelandic', 'Igbo', 'Irish', 'Kannada', 'Kazakh',
    'Khmer', 'K\'iche\'', 'Kinyarwanda', 'Konkani', 'Kyrgyz', 'Latvian', 'Lithuanian', 'Luxembourgish',
    'Macedonian', 'Malay', 'Malayalam', 'Maltese', 'Maori', 'Marathi', 'Mongolian', 'Nepali', 'Odia',
    'Persian', 'Punjabi (Gurmukhi)', 'Punjabi (Shahmukhi)', 'Quechua', 'Scots', 'Serbian', 'Sindhi',
    'Sinhala', 'Slovak', 'Slovenian', 'Sorani', 'Sotho', 'Swahili', 'Tajik', 'Tamil', 'Tatar', 'Telugu',
      'Tigrinya', 'Tswana', 'Turkmen', 'Urdu', 'Uyghur', 'Uzbek', 'Valencian', 'Welsh', 'Wolof', 'Xhosa', 'Yoruba', 'Zulu'
  ];

  constructor(private fb: FormBuilder) {
    this.languageForm = this.fb.group({
      primaryLanguage: ['English'],
      secondary: this.buildLanguageCheckboxes(this.secondaryLanguages, ['English', 'Vietnamese']),
      additional: this.buildLanguageCheckboxes(this.additionalLanguages, [])
    });
  }

  ngOnInit(): void {
    this.languageForm.valueChanges.subscribe(val => console.log(val));
  }

  buildLanguageCheckboxes(languages: string[], selected: string[]): FormGroup {
    const group: { [key: string]: any } = {};
    languages.forEach(lang => {
      group[lang] = [selected.includes(lang)];
    });
    return this.fb.group(group);
  }

  get secondaryControls() {
    return (this.languageForm.get('secondary') as FormGroup).controls;
  }

  get additionalControls() {
    return (this.languageForm.get('additional') as FormGroup).controls;
  }

  savePreferences() {
    // Add logic to save data to a service/API
  }
}