import { TestBed } from '@angular/core/testing';

import { CourseRegistrationService } from './course-registration.service';

describe('CourseRegistrationService', () => {
  let service: CourseRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
