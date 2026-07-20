import { TuiCardLarge } from "@taiga-ui/layout";
import { TuiMultiSelectModule } from "@taiga-ui/legacy";
import { TuiLabel, TuiNotificationService, TuiError, TuiInput } from "@taiga-ui/core";
import {ComponentFixture, TestBed} from '@angular/core/testing'

import {ConsentFormComponent} from './consent-form.component'
import {TestModule} from '@test/test.module'
import {MOCK_ADMIN, MOCK_STUDENT} from "@app/accounts/_test/mock"
import {ReactiveFormsModule} from "@angular/forms"
import {
    AdminTermsAndConditionsSnippetComponent
} from "@app/accounts/admin-terms-and-conditions-snippet/admin-terms-and-conditions-snippet.component"
import {
    StudentTermsAndConditionsSnippetComponent
} from "@app/accounts/student-terms-and-conditions-snippet/student-terms-and-conditions-snippet.component"
import {Router} from "@angular/router"
import {ConsentService} from "@app/accounts/_services/consent.service"
import {ConsentServiceMock} from "@app/accounts/_test/_services/consent.service.mock"
import { TuiSelect } from "@taiga-ui/kit"
import {of} from "rxjs"

describe('ConsentFormComponent', () => {
    let component: ConsentFormComponent
    let fixture: ComponentFixture<ConsentFormComponent>
    let notificationService: TuiNotificationService
    let router: Router

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ConsentFormComponent,
                AdminTermsAndConditionsSnippetComponent,
                StudentTermsAndConditionsSnippetComponent
            ],
            imports: [
                TestModule,
                ReactiveFormsModule,
                TuiCardLarge,
                TuiInput,
                TuiError, TuiError,
                TuiLabel,
                TuiSelect,
                TuiMultiSelectModule
            ],
            providers: [{provide: ConsentService, useClass: ConsentServiceMock}]
        }).compileComponents()
    })
    describe('The user is an admin', () => {
        beforeEach(() => {
            notificationService = TestBed.inject(TuiNotificationService)
            spyOn(notificationService, 'show').and.callFake(() => {
                return of()
            })
            router = TestBed.inject(Router)
            spyOn(router, 'navigate').and.returnValue(Promise.resolve(true))
            fixture = TestBed.createComponent(ConsentFormComponent)
            component = fixture.componentInstance
            component.user = MOCK_ADMIN
            fixture.detectChanges()
        })

        it('should create', () => {
            expect(component).toBeTruthy()
        })

        it('submit consent form', () => {
            component.form.legal_first_name.setValue('Test')
            component.form.legal_last_name.setValue('Student')
            component.form.student_number.setValue('12345678')
            component.form.race.setValue(['White'])
            fixture.detectChanges()
            component.onSubmit()
            expect(router.navigate).toHaveBeenCalledOnceWith(['/accounts', 'survey', 'initial'])
            expect(notificationService.open).toHaveBeenCalled()
        })

        it('remove a user consent', () => {
            component.declineConsent()
            expect(router.navigate).toHaveBeenCalledOnceWith(['/accounts', 'survey', 'initial'])
            expect(notificationService.open).toHaveBeenCalled()
        })

        it('should fill form with name', () => {
            // Empty string in this case as that is what is in the mock user.
            expect(component.form.legal_first_name.value).toEqual('')
            expect(component.form.legal_last_name.value).toEqual('')
        })
    })

    describe('The user is a student', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(ConsentFormComponent)
            component = fixture.componentInstance
            component.user = MOCK_STUDENT
            fixture.detectChanges()
        })

        it('should create', () => {
            expect(component).toBeTruthy()
        })
    })

})
