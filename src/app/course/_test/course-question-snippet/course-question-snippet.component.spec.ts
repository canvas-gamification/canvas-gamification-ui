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
import {
    MOCK_USER_TEACHER,
    MOCK_UQJ,
    MOCK_UQJ2,
    MOCK_QUESTION_REPORT,
    MOCK_QUESTION_REPORT2
} from "@app/course/_test/mock";
import {RouterTestingModule} from "@angular/router/testing";
import {QuestionReportService} from "@app/course/_services/question-report.service";
import {QuestionReportServiceMock} from "@test/question-report.service.mock";
import {QuestionReport} from "@app/_models/question_report";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

describe('CourseQuestionSnippetComponent VALID EVENT', () => {
    let component: CourseQuestionSnippetComponent;
    let fixture: ComponentFixture<CourseQuestionSnippetComponent>;
    let modalService: NgbModal;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, RouterModule],
            declarations: [CourseQuestionSnippetComponent],
            providers: [
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: CourseEventService, useClass: CourseEventServiceMock},
                {provide: UqjService, useClass: UqjServiceMock},
                {provide: QuestionReportService, useClass: QuestionReportServiceMock},
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
        modalService = TestBed.inject(NgbModal);
        spyOn(modalService, 'open').and.callFake(() => null);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseQuestionSnippetComponent);
        component = fixture.componentInstance;
        component.user = MOCK_USER_TEACHER;
        component.reportUQJ = MOCK_UQJ;
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

    it ('report should be deleted', () =>{
        component.deleteReport();
        expect(component.reportUQJ.report).toEqual({} as QuestionReport);
    });

    it ('report should update', () =>{
        component.reportUQJ.report = MOCK_QUESTION_REPORT;
        component.formGroup.setValue({
            description: MOCK_QUESTION_REPORT2.report,
            description_text: MOCK_QUESTION_REPORT2.report_details
        });
        component.reportQuestion();
        expect(component.reportUQJ.report).toEqual(MOCK_QUESTION_REPORT2);
    });

    it ('new report should be made', () =>{
        component.formGroup.setValue({
            description: MOCK_QUESTION_REPORT.report,
            description_text: MOCK_QUESTION_REPORT.report_details
        });
        component.reportUQJ = MOCK_UQJ2;
        component.reportQuestion();
        expect(component.reportUQJ.report).toEqual(MOCK_QUESTION_REPORT);
    });

    it('open modal with valid reportId', () => {
        component.createModal('content',MOCK_UQJ);
        expect(component.reportUQJ).toEqual(MOCK_UQJ);
        expect(modalService.open).toHaveBeenCalledOnceWith('content', {
            ariaLabelledBy: 'modal-basic-title',
            centered: true
        });
    });

    it('open modal without reportId', () => {
        component.createModal('content',MOCK_UQJ2);
        expect(component.reportUQJ).toEqual(MOCK_UQJ2);
        expect(modalService.open).toHaveBeenCalledOnceWith('content', {
            ariaLabelledBy: 'modal-basic-title',
            centered: true
        });
    });

    it('submission should be valid', () => {
        component.formGroup.setValue({
            description: MOCK_QUESTION_REPORT.report,
            description_text: MOCK_QUESTION_REPORT.report_details
        });
        expect(component.isSubmissionValid()).toEqual(false);
    });

    it('other with empty text submission should be invalid', () => {
        component.formGroup.setValue({
            description: 'OTHER',
            description_text: ''
        });
        expect(component.isSubmissionValid()).toEqual(true);
    });

    it('other with text submission should be valid', () => {
        component.formGroup.setValue({
            description: 'OTHER',
            description_text: 'valid text'
        });
        expect(component.isSubmissionValid()).toEqual(false);
    });

    it('empty submission should be invalid', () => {
        component.formGroup.setValue({
            description: null,
            description_text: ''
        });
        expect(component.isSubmissionValid()).toEqual(true);
    });
    it ('report should be filled', () =>{
        component.reportUQJ.report = MOCK_QUESTION_REPORT;
        component.fillReport();
        expect(component.formGroup.get('description').value).toEqual(MOCK_QUESTION_REPORT.report);
        expect(component.formGroup.get('description_text').value).toEqual(MOCK_QUESTION_REPORT.report_details);
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
