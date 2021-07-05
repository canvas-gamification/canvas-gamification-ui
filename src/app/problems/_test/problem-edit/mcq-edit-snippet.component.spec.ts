import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqEditSnippetComponent} from '../../problem-edit/mcq-edit-snippet/mcq-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_CATEGORIES, MOCK_CHECKBOX_QUESTION, MOCK_COURSE, MOCK_MCQ_QUESTION} from '@app/problems/_test/mock';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {CourseService} from "@app/_services/api/course/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/question.service.mock";
import {CourseEventService} from "@app/_services/api/course/course-event.service";
import {CourseEventServiceMock} from "@app/problems/_test/course-event.service.mock";

describe('McqEditSnippetComponent', () => {
    let component: McqEditSnippetComponent;
    let fixture: ComponentFixture<McqEditSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, CKEditorModule, ReactiveFormsModule],
            declarations: [McqEditSnippetComponent, CkEditorComponent, JsonEditorComponent],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: QuestionService, useClass: QuestionServiceMock},
                {provide: CourseEventService, useClass: CourseEventServiceMock}
            ]
        }).compileComponents();
    });
    describe('mcq - edit', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(McqEditSnippetComponent);
            component = fixture.componentInstance;
            component.questionDetails = MOCK_MCQ_QUESTION;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('courses and categories set', () => {
            expect(component.courses).toEqual([MOCK_COURSE]);
            expect(component.categories).toEqual(MOCK_CATEGORIES);
        });

        it('add and remove choice', () => {
            expect(component.distractors.length).toEqual(1);

            component.addChoice();
            expect(component.distractors.length).toEqual(2);

            component.removeChoice(1);
            expect(component.distractors.length).toEqual(1);
        });

        it('courseSelectedById', () => {
            component.courseSelectedById(0);
            expect(component.events).toEqual(MOCK_COURSE.events);
        });

        it('mcq update', () => {
            component.onSubmit();

            // The formGroup is reset upon successful submission.
            expect(component.formGroup.controls['title'].value).toBe(null);
        });
    });

    describe('checkbox - edit', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(McqEditSnippetComponent);
            component = fixture.componentInstance;
            component.questionDetails = MOCK_CHECKBOX_QUESTION;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('add and remove answers', () => {
            expect(component.correctAnswers.length).toEqual(2);

            component.addAnswer();
            expect(component.correctAnswers.length).toEqual(3);

            component.removeAnswer(2);
            expect(component.correctAnswers.length).toEqual(2);
        });

        it('checkbox update', () => {
            component.onSubmit();

            // The formGroup is reset upon successful submission.
            expect(component.formGroup.controls['title'].value).toBe(null);
        });
    });

    describe('mcq - number event', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(McqEditSnippetComponent);
            component = fixture.componentInstance;
            component.questionDetails = MOCK_MCQ_QUESTION;
            component.questionDetails.event = 0;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });
});
