import {TestBed} from '@angular/core/testing';

import {UqjService} from './uqj.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {UQJ} from "@app/_models";
import {MOCK_UQJ, MOCK_UQJ_2} from "@test/mock";

describe('UqjService', () => {
    let uqjService: UqjService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    const mockUqjs: UQJ[] = [MOCK_UQJ, MOCK_UQJ_2];
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
            expect(uqj.results.length).toEqual(3);
            expect(uqj.results).toBe(mockUqjs);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/uqj/?page=1&page_size=50');
        expect(request.request.method).toBe('GET');
        request.flush(mockUqjs);
    });

    it('getUQJs with options returns list', () => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        uqjService.getUQJs({filters: {question__event: 0}, recent: true}).subscribe((uqj) => {
            expect(uqj.results.length).toEqual(3);
            expect(uqj.results).toBe(mockUqjs);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/uqj/?page=1&page_size=50&question__event=0&ordering=-last_viewed');
        expect(request.request.method).toBe('GET');
        request.flush(mockUqjs);
    });

    it('getUQJ returns a single uqj', () => {
        uqjService.getUQJ(1).subscribe((uqj) => {
            expect(uqj.id).toEqual(1);
            expect(uqj.is_checkbox).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('uqj', 1));
        expect(request.request.method).toBe('GET');
        request.flush(mockUqjs.find(uqj => uqj.id === 1));
    });

    it('getUQJByQuestion returns a uqj based on a question', () => {
        uqjService.getUQJByQuestion(0).subscribe((uqj) => {
            expect(uqj.id).toEqual(0);
            expect(uqj.is_checkbox).toBeFalsy();
        });
        const request = httpMock.expectOne('http://localhost:8000/api/uqj/?question=0');
        expect(request.request.method).toBe('GET');
        request.flush(mockUqjs.find(uqj => uqj.question.id === 0));
    });
});
