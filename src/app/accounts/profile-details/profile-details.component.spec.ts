import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileDetailsComponent} from './profile-details.component';
import {TestModule} from '@test/test.module';
import {of} from "rxjs";
import {MOCK_ADMIN, MOCK_ADMIN_CONSENT, MOCK_CONSENT_DECLINE} from "@app/accounts/_test/mock";
import {ProfileDetailsForm} from "@app/accounts/_forms/profile-details.form";

describe('ProfileDetailsComponent', () => {
    let component: ProfileDetailsComponent;
    let fixture: ComponentFixture<ProfileDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileDetailsComponent);
        component = fixture.componentInstance;
        spyOn(component['profile'], 'getProfileDetails').and.returnValue(of(MOCK_ADMIN));
        spyOn(component['consentService'], 'getConsent').and.returnValue(of([MOCK_ADMIN_CONSENT]));
        component.userId = 0;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should save profile data', () => {
        spyOn(component['profile'], 'putProfileDetails').and.returnValue(of(MOCK_ADMIN));
        component.onSubmit();
        const data = ProfileDetailsForm.extractData(component.formGroup);
        expect(component['profile'].putProfileDetails).toHaveBeenCalledWith(data, component.userDetails.id);
    });

    it('should withdraw consent', () => {
        spyOn(component['consentService'], 'declineConsent').and.returnValue(of(MOCK_CONSENT_DECLINE));
        component.withdraw();
        expect(component['consentService'].declineConsent).toHaveBeenCalled();
        component['consentService'].declineConsent().subscribe((declineConsent) => {
            expect(declineConsent).toEqual(MOCK_CONSENT_DECLINE);
        });
    });
});
