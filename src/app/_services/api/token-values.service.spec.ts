import { TestBed } from '@angular/core/testing';

import { TokenValuesService } from './token-values.service';

describe('TokenValuesService', () => {
  let service: TokenValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
