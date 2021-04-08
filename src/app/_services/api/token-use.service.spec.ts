import { TestBed } from '@angular/core/testing';

import { TokenUseService } from './token-use.service';

describe('TokenUseService', () => {
  let service: TokenUseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenUseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
