import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {QuestionCountService} from './question-count.service';
import {TestModule} from "@test/test.module";
import {HttpTestingController} from "@angular/common/http/testing";
import {ApiService} from "@app/_services/api.service";
import {MOCK_QUESTION_COUNT} from "@app/admin/_test/mock";

describe('QuestionCountService', () => {
    let service: QuestionCountService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [QuestionCountService]
        });
        service = TestBed.inject(QuestionCountService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get question counts', fakeAsync(() => {
        service.getQuestionCount().subscribe((questionCounts) => {
            expect(questionCounts).toEqual([MOCK_QUESTION_COUNT]);
        });
        const request = httpMock.expectOne(apiService.getURL('admin/question-count'));
        expect(request.request.method).toBe('GET');
        request.flush([MOCK_QUESTION_COUNT]);
        tick();
    }));
});
