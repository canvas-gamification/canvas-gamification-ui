import { TestBed } from '@angular/core/testing';

import { ProfileDetailsService } from './profile-details.service';

describe('ProfileDetailsService', () => {
  let service: ProfileDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
