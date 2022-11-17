import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CourseEventsSnippetComponent} from '../../course-events-snippet/course-events-snippet.component'
import {TestModule} from '@test/test.module'
import {CourseEventService} from "@app/course/_services/course-event.service"
import {CourseEventServiceMock} from "@app/problems/_test/_services/course-event.service.mock"
import {MOCK_EVENT_TYPES} from "@app/course/_test/mock"
import {MOCK_COURSE, MOCK_COURSE_EVENT} from "@app/problems/_test/mock"
import {TuiDialogService} from "@taiga-ui/core"
import {of} from "rxjs"
import {TuiIslandModule, TuiSelectModule} from "@taiga-ui/kit"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"

describe('CourseEventsSnippetComponent', () => {
    let component: CourseEventsSnippetComponent
    let fixture: ComponentFixture<CourseEventsSnippetComponent>
    let dialogService: TuiDialogService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, TuiSelectModule, TuiIslandModule, ReactiveFormsModule, FormsModule],
            declarations: [CourseEventsSnippetComponent],
            providers: [
                {provide: CourseEventService, useClass: CourseEventServiceMock},
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        dialogService = TestBed.inject(TuiDialogService)
        spyOn(dialogService, 'open').and.callFake(() => of())
        fixture = TestBed.createComponent(CourseEventsSnippetComponent)
        component = fixture.componentInstance
        component.course = MOCK_COURSE
        component.events = [MOCK_COURSE_EVENT]
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('eventTypes Map should be created with data', () => {
        expect(component.eventTypes).toEqual(MOCK_EVENT_TYPES)
    })

    it('open event import modal', () => {
        component.openEventImportDialog()
        expect(component.courseEvents).toEqual([MOCK_COURSE_EVENT])
        expect(dialogService.open).toHaveBeenCalledOnceWith(
            component.importDialog,
            {label: 'Select an Event to Import', size: 'l', closeable: false}
        )
    })

    it('duplicate an event', () => {
        component.importCourseEvent(MOCK_COURSE_EVENT, MOCK_COURSE.id)
    })
})
