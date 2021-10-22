import {TestBed} from '@angular/core/testing';

import {CategoryStatsService} from './category-stats.service';
import {TestModule} from "@test/test.module";
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {MOCK_NESTED_CATEGORY, MOCK_NESTED_CATEGORY_2} from "@app/admin/_test/mock";

describe('CategoryStatsService', () => {
    let service: CategoryStatsService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [CategoryStatsService]
        });
        service = TestBed.inject(CategoryStatsService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get category stats', () => {
        service.getCategoryStats().subscribe((categoryStats) => {
            expect(categoryStats).toEqual([MOCK_NESTED_CATEGORY_2]);
            expect(categoryStats[0].children).toEqual([MOCK_NESTED_CATEGORY]);
        });
        const request = httpMock.expectOne(apiService.getURL('category-stats'));
        expect(request.request.method).toBe('GET');
        request.flush([MOCK_NESTED_CATEGORY_2]);
    });
});
