import { TestBed } from '@angular/core/testing';

import { CommonMcqFunctionsService } from './common-mcq-functions.service';

describe('CommonMcqFunctionsService', () => {
  let service: CommonMcqFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonMcqFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
