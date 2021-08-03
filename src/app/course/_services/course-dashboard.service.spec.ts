import {TestBed} from '@angular/core/testing';
import {CourseDashboardServiceService} from './course-dashboard.service';
import {TestModule} from '@test/test.module';

describe('TestService', () => {
    let service: CourseDashboardServiceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(CourseDashboardServiceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
