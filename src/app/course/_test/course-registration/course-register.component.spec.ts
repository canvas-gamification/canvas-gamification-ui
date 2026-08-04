import {TuiNotificationService, TuiError, TuiInput} from "@taiga-ui/core"
import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseRegisterComponent} from '../../course-registration/course-register.component'
import {TestModule} from '@test/test.module'
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/_services/course.service.mock"
import {ActivatedRoute} from "@angular/router"
import {ReactiveFormsModule} from "@angular/forms"
import {CourseRegistrationStepperComponent} from "@app/course/course-registration/course-registration-stepper/course-registration-stepper.component"
import {CourseRegistrationStepComponent} from "@app/course/course-registration/course-registration-step/course-registration-step.component"
import {TuiStepper} from "@taiga-ui/kit"
import {of} from "rxjs"

describe('CourseRegisterComponent', () => {
    let component: CourseRegisterComponent
    let fixture: ComponentFixture<CourseRegisterComponent>
    let notificationService: TuiNotificationService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, ReactiveFormsModule, TuiStepper, TuiInput, TuiError, TuiError],
            declarations: [CourseRegisterComponent, CourseRegistrationStepperComponent, CourseRegistrationStepComponent],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            parent: {
                                params: {
                                    courseId: 0
                                }
                            }
                        }
                    }
                }
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        notificationService = TestBed.inject(TuiNotificationService)
        spyOn(notificationService, 'open').and.callFake(() => {
            return of()
        })
        fixture = TestBed.createComponent(CourseRegisterComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should submit form', () => {
        component.form.get('code').setValue("123")
        fixture.detectChanges()
        component.onSubmit()
        expect(notificationService.open).toHaveBeenCalled()
    })
})
