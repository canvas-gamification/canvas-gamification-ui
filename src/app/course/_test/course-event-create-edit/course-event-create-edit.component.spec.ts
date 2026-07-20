import {ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing'

import {
    CourseEventCreateEditComponent
} from '../../event/course-event-create/course-event-create-edit.component'
import {TestModule} from '@test/test.module'
import {CourseEventServiceMock} from "@app/problems/_test/_services/course-event.service.mock"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {ActivatedRoute, convertToParamMap, Router, RouterModule} from "@angular/router"
import {ReactiveFormsModule} from "@angular/forms"
import {TuiNotification, TuiDataList, TuiLabel, TuiButton, TuiNotificationService, TuiError, TuiInput} from "@taiga-ui/core"
import {of} from "rxjs"
import {TuiSelect, TuiInputTime, TuiInputDateRange} from "@taiga-ui/kit"

describe('CourseEventCreateComponent with EventId', () => {
    let component: CourseEventCreateEditComponent
    let fixture: ComponentFixture<CourseEventCreateEditComponent>
    let notificationService: TuiNotificationService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule,
                ReactiveFormsModule,
                RouterModule,
                TuiInput,
                TuiSelect,
                TuiDataList,
                TuiError, TuiError,
                TuiLabel,
                TuiInputDateRange,
                TuiInputTime,
                TuiNotification,
                TuiButton
            ],
            providers: [
                {provide: CourseEventService, useClass: CourseEventServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            parent: {
                                paramMap: convertToParamMap({
                                    courseId: 1
                                })
                            },
                            paramMap: convertToParamMap({
                                eventId: 1
                            })
                        }
                    }
                }
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        notificationService = TestBed.inject(TuiNotificationService)
        spyOn(notificationService, 'show').and.callFake(() => {
            return of()
        })
        fixture = TestBed.createComponent(CourseEventCreateEditComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('form data should be filled with data', () => {
        expect(component.formData).toBeTruthy()
    })

    it('submitEvent should work with eventId', fakeAsync(() => {
        component.submitEvent(component.formData)
        flushMicrotasks()
        expect(notificationService.open).toHaveBeenCalled()
    }))
})

describe('CourseEventCreateComponent without EventId', () => {
    let component: CourseEventCreateEditComponent
    let fixture: ComponentFixture<CourseEventCreateEditComponent>
    let router: Router
    let notificationService: TuiNotificationService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule,
                ReactiveFormsModule,
                RouterModule,
                TuiInput,
                TuiSelect,
                TuiDataList,
                TuiError, TuiError,
                TuiLabel,
                TuiInputDateRange,
                TuiInputTime,
                TuiNotification,
                TuiButton
            ],
            providers: [
                {provide: CourseEventService, useClass: CourseEventServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({}),
                            parent: {
                                paramMap: convertToParamMap({
                                    courseId: 1
                                })
                            }
                        }
                    }
                }
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        router = TestBed.inject(Router)
        spyOn(router, 'navigate').and.returnValue(Promise.resolve(true))
        notificationService = TestBed.inject(TuiNotificationService)
        spyOn(notificationService, 'show').and.callFake(() => {
            return of()
        })
        fixture = TestBed.createComponent(CourseEventCreateEditComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('submitEvent should work without eventId', fakeAsync(() => {
        component.submitEvent(component.formData)
        flushMicrotasks()
        expect(notificationService.open).toHaveBeenCalled()
        expect(router.navigate).toHaveBeenCalledOnceWith(['course', 1, 'assignments-exams'])
    }))
})
