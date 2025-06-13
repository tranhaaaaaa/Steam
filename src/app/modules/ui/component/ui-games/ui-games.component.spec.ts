import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiGamesComponent } from './ui-games.component';

describe('UiGamesComponent', () => {
  let component: UiGamesComponent;
  let fixture: ComponentFixture<UiGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
