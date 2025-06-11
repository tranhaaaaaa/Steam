import { TestBed } from '@angular/core/testing';

import { DataReponseService } from './data-reponse.service';

describe('DataReponseService', () => {
  let service: DataReponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataReponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
