import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBuyedComponent } from './game-buyed.component';

describe('GameBuyedComponent', () => {
  let component: GameBuyedComponent;
  let fixture: ComponentFixture<GameBuyedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBuyedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameBuyedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
