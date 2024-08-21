import { TestBed } from '@angular/core/testing';

import { VoterTokenService } from './voter-token.service';

describe('VoterTokenService', () => {
  let service: VoterTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoterTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
