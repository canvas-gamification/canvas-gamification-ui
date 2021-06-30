import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JavaCreateSnippetComponent} from '../../problem-create/java-create-snippet/java-create-snippet.component';
import {TestModule} from '@test/test.module';
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {CourseService} from "@app/_services/api/course/course.service";
import {CourseServiceMock} from "@test/course.service.mock";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_tests/question.service.mock";
import {ReactiveFormsModule} from "@angular/forms";
import {MOCK_COURSE} from "@app/problems/_tests/mock";

describe('JavaCreateSnippetComponent', () => {
    let component: JavaCreateSnippetComponent;
    let fixture: ComponentFixture<JavaCreateSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [JavaCreateSnippetComponent, CkEditorComponent, JsonEditorComponent],
            imports: [TestModule, CKEditorModule, ReactiveFormsModule],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: QuestionService, useClass: QuestionServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JavaCreateSnippetComponent);
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

    it('java create question', () => {
        component.formGroup.controls['title'].setValue('Test Title');
        component.onSubmit();

        // The formGroup is reset upon successful submission.
        expect(component.formGroup.controls['title'].value).toBe(null);
    });
});
