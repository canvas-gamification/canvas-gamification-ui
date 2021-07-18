import {TestBed} from '@angular/core/testing';
import {TokenUseService} from './token-use.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {MOCK_COURSE_REGISTRATION} from "@app/course/_test/mock";

describe('TokenUseService', () => {
    let tokenUseService: TokenUseService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [TokenUseService, ApiService]
        });
        tokenUseService = TestBed.inject(TokenUseService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(tokenUseService).toBeTruthy();
    });

    it('useTokens', () => {
        const data = {};
        MOCK_COURSE_REGISTRATION.token_uses.forEach(tokenUse => data[tokenUse.option.id] = tokenUse.num_used);
        tokenUseService.useTokens(data, MOCK_COURSE_REGISTRATION.id).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        const request = httpMock.expectOne(apiService.getURL('token-use', 'use', MOCK_COURSE_REGISTRATION.id));
        expect(request.request.method).toBe('POST');
        request.flush({success: true});
    });
});
