import {TestBed} from '@angular/core/testing';

import {ViewCoursesService} from './view-courses.service';
import {MOCK_VIEW_COURSE} from "@app/admin/_test/mock";
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {TestModule} from "@test/test.module";
import {QuestionCountService} from "@app/admin/_services/question-count.service";

describe('ViewCoursesService', () => {
    let service: ViewCoursesService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [QuestionCountService]
        });
        service = TestBed.inject(ViewCoursesService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get courses details', () => {
        service.viewCourses().subscribe((viewCourses) => {
            expect(viewCourses).toEqual([MOCK_VIEW_COURSE]);
        });
        const request = httpMock.expectOne(apiService.getURL('admin/view-courses'));
        expect(request.request.method).toBe('GET');
        request.flush([MOCK_VIEW_COURSE]);
    });
});
