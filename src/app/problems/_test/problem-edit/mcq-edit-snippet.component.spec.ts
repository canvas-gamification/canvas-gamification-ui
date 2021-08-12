import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqEditSnippetComponent} from '../../problem-edit/mcq-edit-snippet/mcq-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {
    MOCK_CATEGORIES,
    MOCK_CHECKBOX_QUESTION,
    MOCK_COURSE,
    MOCK_COURSE_EVENT,
    MOCK_MCQ_QUESTION
} from '@app/problems/_test/mock';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {CourseServiceMock} from "@test/course.service.mock";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/question.service.mock";
import {CourseEventServiceMock} from "@app/problems/_test/course-event.service.mock";
import {CourseService} from "@app/course/_services/course.service";
import {CourseEventService} from "@app/course/_services/course-event.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

describe('McqEditSnippetComponent', () => {
    let component: McqEditSnippetComponent;
    let fixture: ComponentFixture<McqEditSnippetComponent>;
    let router: Router;
    let toastr: ToastrService;

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
            router = TestBed.inject(Router);
            spyOn(router, 'navigate');
            toastr = TestBed.inject(ToastrService);
            spyOn(toastr, 'success');
            fixture = TestBed.createComponent(McqEditSnippetComponent);
            component = fixture.componentInstance;
            component.questionDetails = MOCK_MCQ_QUESTION;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should set courses and categories', () => {
            expect(component.courses).toEqual([MOCK_COURSE]);
            expect(component.categories).toEqual(MOCK_CATEGORIES);
        });

        it('should add/remove choice', () => {
            expect(component.distractors.length).toEqual(1);

            component.addChoice();
            expect(component.distractors.length).toEqual(2);

            component.removeChoice(1);
            expect(component.distractors.length).toEqual(1);
        });

        it('should set course', () => {
            component.setCourse(0);
            expect(component.events).toEqual(MOCK_COURSE.events);
            expect(component.form.event.value).toBeNull();
        });

        it('should set event', () => {
            component.setEvent(1);
            expect(component.form.event.value).toEqual(MOCK_COURSE_EVENT.id);
        });

        it('should update mcq', () => {
            component.onSubmit();
            expect(toastr.success).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledOnceWith(['problems', '0', 'edit']);
        });

        it('should be invalid without required fields', () => {
            expect(fixture.debugElement.nativeElement.querySelector('#submit').disabled).toBeTruthy();
        });

        it('should be invalid mcq submission', () => {
            expect(component.isSubmissionValid()).toBeFalsy();
        });

        it('should be valid mcq submission', () => {
            component.questionText = 'Test';
            fixture.detectChanges();
            expect(component.isSubmissionValid()).toBeTruthy();
        });
    });

    describe('checkbox question - edit', () => {
        beforeEach(() => {
            router = TestBed.inject(Router);
            spyOn(router, 'navigate');
            fixture = TestBed.createComponent(McqEditSnippetComponent);
            component = fixture.componentInstance;
            component.questionDetails = MOCK_CHECKBOX_QUESTION;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should add/remove answers', () => {
            expect(component.correctAnswers.length).toEqual(2);

            component.addAnswer();
            expect(component.correctAnswers.length).toEqual(3);

            component.removeAnswer(2);
            expect(component.correctAnswers.length).toEqual(2);
        });

        it('should update checkbox question', () => {
            component.onSubmit();
            expect(router.navigate).toHaveBeenCalledOnceWith(['problems', '1', 'edit']);
        });

        it('should be valid checkbox submission', () => {
            component.questionText = 'Test';
            fixture.detectChanges();
            expect(component.isSubmissionValid()).toBeTruthy();
        });

        // TODO - Determine how to test this.
        // it('click practice checkbox', () => {
        //     fixture.debugElement.nativeElement.querySelector('#practiceCheckbox').click();
        //     fixture.detectChanges();
        //     expect(component.isPractice).toBeFalsy();
        // });

        it('should be invalid checkbox submission', () => {
            component.isPractice = true;
            component.form.course.setValue(MOCK_COURSE);
            component.form.event.setValue(MOCK_COURSE_EVENT);
            fixture.detectChanges();
            expect(component.isSubmissionValid()).toBeFalsy();
        });
    });

    describe('mcq - with number event', () => {
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
