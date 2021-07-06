import {TestBed} from '@angular/core/testing';

import {CourseEventService} from './course-event.service';
import {TestModule} from '@test/test.module';

describe('CourseEventService', () => {
    let service: CourseEventService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(CourseEventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
