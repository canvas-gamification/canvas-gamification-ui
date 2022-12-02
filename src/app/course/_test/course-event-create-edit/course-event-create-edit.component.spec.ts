import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing'

import {CourseEventCreateEditComponent} from '../../course-event-create/course-event-create-edit.component'
import {TestModule} from '@test/test.module'
import {CourseEventServiceMock} from "@app/problems/_test/_services/course-event.service.mock"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {ActivatedRoute, convertToParamMap, Router, RouterModule} from "@angular/router"
import {ReactiveFormsModule} from "@angular/forms"
import {TuiButtonModule, TuiDataListModule, TuiNotificationModule, TuiNotificationsService} from "@taiga-ui/core"
import {of} from "rxjs"
import {
    TuiCheckboxLabeledModule,
    TuiFieldErrorModule,
    TuiInputDateRangeModule,
    TuiInputModule,
    TuiInputTimeModule,
    TuiSelectModule
} from "@taiga-ui/kit"

describe('CourseEventCreateComponent with EventId', () => {
    let component: CourseEventCreateEditComponent
    let fixture: ComponentFixture<CourseEventCreateEditComponent>
    let notificationService: TuiNotificationsService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule,
                ReactiveFormsModule,
                RouterModule,
                TuiInputModule,
                TuiSelectModule,
                TuiDataListModule,
                TuiFieldErrorModule,
                TuiCheckboxLabeledModule,
                TuiInputDateRangeModule,
                TuiInputTimeModule,
                TuiNotificationModule,
                TuiButtonModule
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
        notificationService = TestBed.inject(TuiNotificationsService)
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
        expect(notificationService.show).toHaveBeenCalled()
    }))
})

describe('CourseEventCreateComponent without EventId', () => {
    let component: CourseEventCreateEditComponent
    let fixture: ComponentFixture<CourseEventCreateEditComponent>
    let router: Router
    let notificationService: TuiNotificationsService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule,
                ReactiveFormsModule,
                RouterModule,
                TuiInputModule,
                TuiSelectModule,
                TuiDataListModule,
                TuiFieldErrorModule,
                TuiCheckboxLabeledModule,
                TuiInputDateRangeModule,
                TuiInputTimeModule,
                TuiNotificationModule,
                TuiButtonModule
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
        notificationService = TestBed.inject(TuiNotificationsService)
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

    it('submitEvent should work without eventId', () => {
        component.submitEvent(component.formData)
        expect(notificationService.show).toHaveBeenCalled()
        expect(router.navigate).toHaveBeenCalledOnceWith(['course', 1])
    })
})
