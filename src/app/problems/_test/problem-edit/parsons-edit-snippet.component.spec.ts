import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsEditSnippetComponent} from '../../problem-edit/parsons-edit-snippet/parsons-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_COURSE, MOCK_COURSE_EVENT, MOCK_PARSONS_QUESTION} from '@app/problems/_test/mock';
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {CourseServiceMock} from "@test/course.service.mock";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/question.service.mock";
import {CourseEventServiceMock} from "@app/problems/_test/course-event.service.mock";
import {CourseService} from "@app/course/_services/course.service";
import {CourseEventService} from "@app/course/_services/course-event.service";
import {Router} from "@angular/router";

describe('ParsonsEditSnippetComponent', () => {
    let component: ParsonsEditSnippetComponent;
    let fixture: ComponentFixture<ParsonsEditSnippetComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ParsonsEditSnippetComponent, CkEditorComponent, JsonEditorComponent],
            imports: [TestModule, CKEditorModule, ReactiveFormsModule],
            providers: [{provide: CategoryService, useClass: CategoryServiceMock},
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: QuestionService, useClass: QuestionServiceMock},
                {provide: CourseEventService, useClass: CourseEventServiceMock}
            ]
        }).compileComponents();
    });

    describe('parsons - with event', () => {
        beforeEach(() => {
            router = TestBed.inject(Router);
            spyOn(router, 'navigate');
            fixture = TestBed.createComponent(ParsonsEditSnippetComponent);
            component = fixture.componentInstance;
            component.questionDetails = MOCK_PARSONS_QUESTION;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('setCourse', () => {
            component.setCourse(0);
            expect(component.events).toEqual(MOCK_COURSE.events);
            expect(component.form.event.value).toBeNull();
        });

        it('setEvent', () => {
            component.setEvent(1);
            expect(component.form.event.value).toEqual(MOCK_COURSE_EVENT.id);
        });

        it('parsons update', () => {
            component.onSubmit();
            expect(router.navigate).toHaveBeenCalledOnceWith(['problems', '3', 'edit']);
        });

        it('required fields - invalid', () => {
            expect(fixture.debugElement.nativeElement.querySelector('#submit').disabled).toBeTruthy();
        });

        // TODO - Determine how to test this.
        // it('click practice checkbox', () => {
        //     fixture.debugElement.nativeElement.querySelector('#practiceCheckbox').click();
        //     fixture.detectChanges();
        //     expect(component.isPractice).toBeTruthy();
        // });

        it('isSubmissionValid - invalid', () => {
            component.isPractice = true;
            component.form.course.setValue(MOCK_COURSE);
            component.form.event.setValue(MOCK_COURSE_EVENT);
            fixture.detectChanges();
            expect(component.isSubmissionValid()).toBeFalsy();
        });

        it('isSubmissionValid - valid', () => {
            component.questionText = 'Test';
            fixture.detectChanges();
            expect(component.isSubmissionValid()).toBeTruthy();
        });
    });

    describe('parsons - no event', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(ParsonsEditSnippetComponent);
            component = fixture.componentInstance;
            component.questionDetails = MOCK_PARSONS_QUESTION;
            component.questionDetails.event = null;
            fixture.detectChanges();
        });

        it('should create - no event', () => {
            expect(component).toBeTruthy();
        });
    });
});
