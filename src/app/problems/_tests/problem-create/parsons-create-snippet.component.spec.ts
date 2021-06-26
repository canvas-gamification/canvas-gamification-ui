import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsCreateSnippetComponent} from '../../problem-create/parsons-create-snippet/parsons-create-snippet.component';
import {TestModule} from '@test/test.module';
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@app/problems/_tests/category.service.mock";
import {CourseService} from "@app/_services/api/course/course.service";
import {CourseServiceMock} from "@app/problems/_tests/course.service.mock";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_tests/question.service.mock";
import {MOCK_COURSE} from "@app/problems/_tests/mock";

describe('ParsonsCreateSnippetComponent', () => {
    let component: ParsonsCreateSnippetComponent;
    let fixture: ComponentFixture<ParsonsCreateSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ParsonsCreateSnippetComponent, CkEditorComponent, JsonEditorComponent],
            imports: [TestModule, CKEditorModule, ReactiveFormsModule],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: QuestionService, useClass: QuestionServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsonsCreateSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('courseSelectedById', () => {
        component.courseSelectedById(0);
        expect(component.events).toEqual(MOCK_COURSE.events);
    });

    it('parsons create question', () => {
        component.formGroup.controls['title'].setValue('Test Title');
        component.formGroup.controls['lines'].setValue('Test Line');
        component.onSubmit();

        // The formGroup is reset upon successful submission.
        expect(component.formGroup.controls['title'].value).toBe(null);
    });
});
