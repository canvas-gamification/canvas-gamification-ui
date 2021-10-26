import {TestBed} from '@angular/core/testing';

import {UqjService} from './uqj.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {MOCK_QUESTIONS, MOCK_UQJS, MOCK_UQJ} from "@app/problems/_test/mock";

describe('UqjService', () => {
    let uqjService: UqjService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [ApiService]
        });
        uqjService = TestBed.inject(UqjService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(uqjService).toBeTruthy();
    });

    it('getUQJs returns UQJs list', () => {
        uqjService.getUQJs().subscribe((uqj) => {
            expect(uqj.results.length).toEqual(MOCK_UQJS.length);
            expect(uqj.results).toBe(MOCK_UQJS);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/uqj/?page=1&page_size=50');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_UQJS);
    });

    it('getUQJs with options returns list', () => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        uqjService.getUQJs({filters: {question__event: 0}, recent: true}).subscribe((uqj) => {
            expect(uqj.results.length).toEqual(MOCK_UQJS.length);
            expect(uqj.results).toBe(MOCK_UQJS);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/uqj/?page=1&page_size=50&question__event=0&ordering=-last_viewed');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_UQJS);
    });

    it('getUQJ returns a single uqj', () => {
        uqjService.getUQJ(MOCK_UQJS[1].id).subscribe((uqj) => {
            expect(uqj).toEqual(MOCK_UQJS[1]);
        });
        const request = httpMock.expectOne(apiService.getURL('uqj', MOCK_UQJS[1].id));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_UQJS.find(uqj => uqj.id === MOCK_UQJS[1].id));
    });

    it('getUQJByQuestion returns a uqj based on a question', () => {
        uqjService.getUQJByQuestion(MOCK_QUESTIONS[0].id).subscribe((uqj) => {
            expect(uqj).toEqual(MOCK_UQJS[0]);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/uqj/?question=0');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_UQJS.find(uqj => uqj.question.id === MOCK_QUESTIONS[0].id));
    });

    it('register method should work for single student', () => {
        uqjService.updateFavourite({id: MOCK_UQJ.id, status: MOCK_UQJ.is_favourite}).subscribe((response) => {
            expect(response);
        });
        const request = httpMock.expectOne(apiService.getURL('uqj-generic', 'switch-favorite'));
        expect(request.request.method).toBe('POST');
        request.flush({id: MOCK_UQJ.id, status: MOCK_UQJ.is_favourite});
    });
});
