import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseEventsSnippetComponent} from '../../course-events-snippet/course-events-snippet.component';
import {TestModule} from '@test/test.module';
import {CourseEventService} from "@app/course/_services/course-event.service";
import {CourseEventServiceMock} from "@app/problems/_test/course-event.service.mock";
import {MOCK_EVENT_TYPES, MOCK_USER_STUDENT, MOCK_USER_TEACHER} from "@app/course/_test/mock";
import {MOCK_COURSE_EVENT} from "@app/problems/_test/mock";

describe('CourseEventsSnippetComponent', () => {
    let component: CourseEventsSnippetComponent;
    let fixture: ComponentFixture<CourseEventsSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [CourseEventsSnippetComponent],
            providers: [
                {provide: CourseEventService, useClass: CourseEventServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseEventsSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('eventTypes Map should be created with data', () => {
        expect(component.eventTypes).toEqual(MOCK_EVENT_TYPES);
    });

    it('buttonText should work for Student', () => {
        component.user = MOCK_USER_STUDENT;
        component.eventTypesMap = new Map(MOCK_EVENT_TYPES.map(([k, v]) => [k, v]));
        //Only need to check the first word since it is the only thing that is different between student/teacher
        expect(component.getEventButtonText(MOCK_COURSE_EVENT).split(' ')[0]).toEqual('Do');
    });

    it('buttonText should work for Teacher', () => {
        component.user = MOCK_USER_TEACHER;
        component.eventTypesMap = new Map(MOCK_EVENT_TYPES.map(([k, v]) => [k, v]));
        //Only need to check the first word since it is the only thing that is different between student/teacher
        expect(component.getEventButtonText(MOCK_COURSE_EVENT).split(' ')[0]).toEqual('Open');
    });
});
