import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {DifficultyService} from './difficulty.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {MOCK_DIFFICULTIES} from "@app/problems/_test/mock";

describe('DifficultyService', () => {
    let difficultyService: DifficultyService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [ApiService]
        });
        difficultyService = TestBed.inject(DifficultyService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(difficultyService).toBeTruthy();
    });

    it('getDifficulties returns difficulties', fakeAsync(() => {
        difficultyService.getDifficulties().subscribe((difficulties) => {
            expect(difficulties.length).toEqual(MOCK_DIFFICULTIES.length);
            expect(difficulties).toEqual(MOCK_DIFFICULTIES);
        });
        const request = httpMock.expectOne(apiService.getURL('difficulty'));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_DIFFICULTIES);
        tick();
    }));
});
