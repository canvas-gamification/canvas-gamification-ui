import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing'

import {ProfileDetailsComponent} from './profile-details.component'
import {TestModule} from '@test/test.module'
import {of} from "rxjs"
import {MOCK_ADMIN, MOCK_ADMIN_CONSENT, MOCK_CONSENT_DECLINE} from "@app/accounts/_test/mock"
import {ProfileDetailsForm} from "@app/accounts/_forms/profile-details.form"
import {Component, ViewChild} from "@angular/core"

@Component({
    selector: 'test-app-withdraw-consent-dialog',
    template: `
        <ng-template let-observer #testDialog></ng-template>`
})
class TestWithdrawConsentDialogComponent {
    @ViewChild('testDialog') testDialog

    completeDialog(): void {
        this.testDialog.observer.next()
    }
}

describe('ProfileDetailsComponent', () => {
    let component: ProfileDetailsComponent
    let fixture: ComponentFixture<ProfileDetailsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [TestWithdrawConsentDialogComponent]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileDetailsComponent)
        component = fixture.componentInstance
        spyOn(component['profile'], 'getProfileDetails').and.returnValue(of(MOCK_ADMIN))
        spyOn(component['consentService'], 'getConsent').and.returnValue(of([MOCK_ADMIN_CONSENT]))
        component.userId = 0
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should save profile data', () => {
        spyOn(component['profile'], 'putProfileDetails').and.returnValue(of(MOCK_ADMIN))
        component.onSubmit()
        const data = ProfileDetailsForm.extractData(component.formGroup)
        expect(component['profile'].putProfileDetails).toHaveBeenCalledWith(data, component.userDetails.id)
    })

    it('should withdraw consent', fakeAsync(() => {
        spyOn(component['consentService'], 'declineConsent').and.returnValue(of(MOCK_CONSENT_DECLINE))
        component.withdraw()
        expect(component['consentService'].declineConsent).toHaveBeenCalled()
        component['consentService'].declineConsent().subscribe((declineConsent) => {
            expect(declineConsent).toEqual(MOCK_CONSENT_DECLINE)
        })
        tick()
    }))

    it('should open withdraw consent modal', () => {
        spyOn(component['dialogService'], 'open').and.callThrough()
        spyOn(component, 'withdraw').and.callThrough()
        component.confirmWithdrawConsentDialog('')
        expect(component['dialogService'].open).toHaveBeenCalled()
    })
})
