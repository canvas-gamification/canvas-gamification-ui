import { TestBed } from '@angular/core/testing';

import { UserActionsService } from './user-actions.service';

describe('UserActionsService', () => {
  let service: UserActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
