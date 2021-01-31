import { TestBed } from '@angular/core/testing';

import { UserUqjService } from './user-uqj.service';

describe('UqjService', () => {
  let service: UserUqjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUqjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
