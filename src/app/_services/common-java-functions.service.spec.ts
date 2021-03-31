import { TestBed } from '@angular/core/testing';

import { CommonJavaFunctionsService } from './common-java-functions.service';

describe('CommonJavaFunctionsService', () => {
  let service: CommonJavaFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonJavaFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
