import {TestBed} from '@angular/core/testing';

import {ViewCoursesService} from './view-courses.service';

describe('ViewCoursesService', () => {
    let service: ViewCoursesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ViewCoursesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
