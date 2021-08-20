import {TestBed} from '@angular/core/testing';
import {CourseDashboardService} from './course-dashboard.service';
import {TestModule} from '@test/test.module';

describe('TestService', () => {
    let service: CourseDashboardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(CourseDashboardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
