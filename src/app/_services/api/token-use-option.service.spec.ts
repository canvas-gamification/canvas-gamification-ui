import { TestBed } from '@angular/core/testing';

import { TokenUseOptionService } from './token-use-option.service';

describe('TokenUseOptionService', () => {
  let service: TokenUseOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenUseOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
