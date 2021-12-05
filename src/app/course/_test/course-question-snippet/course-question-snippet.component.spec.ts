import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseQuestionSnippetComponent} from '../../course-question-snippet/course-question-snippet.component';
import {TestModule} from '@test/test.module';
import {CourseService} from "@app/course/_services/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {CourseEventService} from "@app/course/_services/course-event.service";
import {CourseEventServiceMock} from "@app/problems/_test/course-event.service.mock";
import {UqjService} from "@app/problems/_services/uqj.service";
import {UqjServiceMock} from "@app/problems/_test/uqj.service.mock";
import {ActivatedRoute, convertToParamMap, RouterModule} from "@angular/router";
import {MOCK_USER_TEACHER, MOCK_UQJ, MOCK_UQJ2} from "@app/course/_test/mock";
import {RouterTestingModule} from "@angular/router/testing";

describe('CourseQuestionSnippetComponent VALID EVENT', () => {
    let component: CourseQuestionSnippetComponent;
    let fixture: ComponentFixture<CourseQuestionSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, RouterModule],
            declarations: [CourseQuestionSnippetComponent],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: CourseEventService, useClass: CourseEventServiceMock},
                {provide: UqjService, useClass: UqjServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({
                                eventId: 1,
                                courseId: 1
                            })
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseQuestionSnippetComponent);
        component = fixture.componentInstance;
        component.user = MOCK_USER_TEACHER;
        component.uqjs = [MOCK_UQJ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load up all the UQJs, and the event', () => {
        expect(component.event).toBeTruthy();
        expect(component.uqjs).toBeTruthy();
    });

    it('getStatus should work when UQJ is an exam', () => {
        expect(component.getStatus(MOCK_UQJ)).toEqual('Submitted');
        expect(component.getStatus(MOCK_UQJ2)).toEqual('Not Submitted');
    });

    it('highlight should work', () => {
        expect(component.highlight('Solved')).toEqual('highlight-success');
        expect(component.highlight('Partially Solved')).toEqual('highlight-warning');
        expect(component.highlight('Wrong')).toEqual('highlight-danger');
    });

    it('switch favorite should work', () => {
        component.switchFavorite(MOCK_UQJ.id, MOCK_UQJ.is_favorite, MOCK_UQJ.question.id);
        expect(component.uqjs[0].is_favorite).toEqual(false);
    });
});
describe('CourseQuestionSnippetComponent INVALID EVENT', () => {
    let component: CourseQuestionSnippetComponent;
    let fixture: ComponentFixture<CourseQuestionSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, RouterTestingModule.withRoutes([])],
            declarations: [CourseQuestionSnippetComponent],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: CourseEventService, useClass: CourseEventServiceMock},
                {provide: UqjService, useClass: UqjServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({
                                eventId: 0,
                                courseId: 1
                            })
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseQuestionSnippetComponent);
        component = fixture.componentInstance;
        component.user = MOCK_USER_TEACHER;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have undefined values for subscribed values', () => {
        expect(component.uqjs).toBeUndefined();
        expect(component.event).toBeUndefined();
    });
});
