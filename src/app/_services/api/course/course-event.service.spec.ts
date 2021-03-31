import { TestBed } from '@angular/core/testing';

import { CourseEventService } from './course-event.service';

describe('CourseEventService', () => {
  let service: CourseEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
