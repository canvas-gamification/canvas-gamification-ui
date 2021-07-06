import {TestBed} from '@angular/core/testing';

import {CourseService} from './course.service';
import {TestModule} from '@test/test.module';

describe('CourseService', () => {
    let service: CourseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(CourseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
