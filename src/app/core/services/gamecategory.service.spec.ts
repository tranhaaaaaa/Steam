import { TestBed } from '@angular/core/testing';

import { GamecategoryService } from './gamecategory.service';

describe('GamecategoryService', () => {
  let service: GamecategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamecategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
