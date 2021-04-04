import { TestBed } from '@angular/core/testing';

import { ProblemHelpersService } from './problem-helpers.service';

describe('ProblemHelpersService', () => {
  let service: ProblemHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
