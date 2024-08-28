import { TestBed } from '@angular/core/testing';

import { CommonDataService } from './common-data.service';

describe('CommonDataService', () => {
  let service: CommonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
