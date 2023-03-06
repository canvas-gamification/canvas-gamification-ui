import {ComponentFixture, TestBed} from '@angular/core/testing'

import {
    CourseEventsSnippetComponent
} from '../../event/course-events-snippet/course-events-snippet.component'
import {TestModule} from '@test/test.module'
import {CourseEventService} from "@app/course/_services/course-event.service"
import {CourseEventServiceMock} from "@app/problems/_test/_services/course-event.service.mock"
import {MOCK_COURSE1, MOCK_EVENT_TYPES} from "@app/course/_test/mock"
import {MOCK_COURSE, MOCK_COURSE_EVENT} from "@app/problems/_test/mock"
import {TuiDialogService} from "@taiga-ui/core"
import {of} from "rxjs"
import {TuiIslandModule, TuiSelectModule} from "@taiga-ui/kit"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {ActivatedRoute, convertToParamMap} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"
import {CourseServiceMock} from "@test/_services/course.service.mock"

describe('CourseEventsSnippetComponent', () => {
    let component: CourseEventsSnippetComponent
    let fixture: ComponentFixture<CourseEventsSnippetComponent>
    let dialogService: TuiDialogService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule,
                TuiSelectModule,
                TuiIslandModule,
                ReactiveFormsModule,
                FormsModule
            ],
            declarations: [CourseEventsSnippetComponent],
            providers: [
                {provide: CourseEventService, useClass: CourseEventServiceMock},
                {provide: CourseService, useClass: CourseServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            parent: {
                                paramMap: convertToParamMap({
                                    courseId: 0
                                })
                            }
                        }
                    }
                }
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        dialogService = TestBed.inject(TuiDialogService)
        spyOn(dialogService, 'open').and.callFake(() => of())
        fixture = TestBed.createComponent(CourseEventsSnippetComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('course should be retrieved on initial load', () => {
        expect(component.course).toEqual(MOCK_COURSE1)
    })

    it('course events should be retrieved on initial load', () => {
        expect(component.events).toEqual(MOCK_COURSE1.events)
    })

    it('eventTypes Map should be created with data', () => {
        expect(component.eventTypes).toEqual(MOCK_EVENT_TYPES)
    })

    it('open event import modal', () => {
        component.openEventImportDialog()
        expect(component.courseEvents).toEqual([MOCK_COURSE_EVENT])
        expect(dialogService.open).toHaveBeenCalledOnceWith(
            component.importDialog,
            {label: 'Which assessment do you want to import?', size: 'l', closeable: false}
        )
    })

    it('duplicate an event', () => {
        component.importCourseEvent(MOCK_COURSE_EVENT, MOCK_COURSE.id)
    })
})
