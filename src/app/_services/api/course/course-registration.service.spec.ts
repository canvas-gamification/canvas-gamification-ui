import {TestBed} from '@angular/core/testing';

import {CourseRegistrationService} from './course-registration.service';
import {TestModule} from '@test/test.module';

describe('CourseRegistrationService', () => {
    let service: CourseRegistrationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(CourseRegistrationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
