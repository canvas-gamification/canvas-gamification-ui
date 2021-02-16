import { TestBed } from '@angular/core/testing';

import { UqjService } from './uqj.service';

describe('UqjService', () => {
  let service: UqjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UqjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
