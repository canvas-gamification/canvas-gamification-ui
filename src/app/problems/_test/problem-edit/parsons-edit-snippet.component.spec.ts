import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsEditSnippetComponent} from '../../problem-edit/parsons-edit-snippet/parsons-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_COURSE, MOCK_PARSONS_QUESTION} from '@app/problems/_test/mock';
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {CourseService} from "@app/_services/api/course/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/question.service.mock";
import {CourseEventService} from "@app/_services/api/course/course-event.service";
import {CourseEventServiceMock} from "@app/problems/_test/course-event.service.mock";

describe('ParsonsEditSnippetComponent', () => {
    let component: ParsonsEditSnippetComponent;
    let fixture: ComponentFixture<ParsonsEditSnippetComponent>;

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
            fixture = TestBed.createComponent(ParsonsEditSnippetComponent);
            component = fixture.componentInstance;
            component.questionDetails = MOCK_PARSONS_QUESTION;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('courseSelectedById', () => {
            component.courseSelectedById(0);
            expect(component.events).toEqual(MOCK_COURSE.events);
        });

        it('parsons update', () => {
            component.onSubmit();

            // The formGroup is reset upon successful submission.
            expect(component.formGroup.controls['title'].value).toBe(null);
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
