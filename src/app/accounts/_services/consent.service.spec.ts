import {TestBed} from '@angular/core/testing';

import {ConsentService} from './consent.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {MOCK_ADMIN_CONSENT} from "@app/accounts/_test/mock";

describe('ConsentService', () => {
    let consentService: ConsentService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [ConsentService, ApiService]
        });
        consentService = TestBed.inject(ConsentService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(consentService).toBeTruthy();
    });

    it('submit a user consent', () => {
        consentService.postConsent(MOCK_ADMIN_CONSENT).subscribe((consent) => {
            expect(consent).toEqual(MOCK_ADMIN_CONSENT);
        });
        const request = httpMock.expectOne(apiService.getURL('user-consent'));
        expect(request.request.method).toBe('POST');
        request.flush(MOCK_ADMIN_CONSENT);
    });

    it('get user consents', () => {
        consentService.getConsent().subscribe((consents) => {
            expect(consents).toEqual([MOCK_ADMIN_CONSENT]);
        });
        const request = httpMock.expectOne(apiService.getURL('user-consent'));
        expect(request.request.method).toBe('GET');
        request.flush([MOCK_ADMIN_CONSENT]);
    });

    it('remove a user consent', () => {
        consentService.declineConsent().subscribe((consent) => {
            expect(consent).toEqual(MOCK_ADMIN_CONSENT);
        });
        const request = httpMock.expectOne(apiService.getURL('user-consent'));
        expect(request.request.method).toBe('POST');
        request.flush(MOCK_ADMIN_CONSENT);
    });
});
