import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JavaCreateSnippetComponent} from '../../problem-create/java-create-snippet/java-create-snippet.component';
import {TestModule} from '@test/test.module';
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {CourseServiceMock} from "@test/course.service.mock";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/question.service.mock";
import {ReactiveFormsModule} from "@angular/forms";
import {MOCK_COURSE, MOCK_COURSE_EVENT} from "@app/problems/_test/mock";
import {CourseService} from "@app/course/_services/course.service";
import {Router} from "@angular/router";

describe('JavaCreateSnippetComponent', () => {
    let component: JavaCreateSnippetComponent;
    let fixture: ComponentFixture<JavaCreateSnippetComponent>;
    let router: Router;

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
        router = TestBed.inject(Router);
        spyOn(router, 'navigate');
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
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledOnceWith(['problems', 'create', 'java']);
    });

    it('required fields - invalid', () => {
        expect(fixture.debugElement.nativeElement.querySelector('#submit').disabled).toBeTruthy();
    });

    it('isSubmissionValid - invalid', () => {
        component.isPractice = true;
        component.form.course.setValue(MOCK_COURSE);
        component.form.event.setValue(MOCK_COURSE_EVENT);
        fixture.detectChanges();
        expect(component.isSubmissionValid()).toBeFalsy();
    });

    it('isSubmissionValid - valid', () => {
        component.isPractice = false;
        component.form.title.setValue('Test');
        component.form.difficulty.setValue('Easy');
        component.form.category.setValue('Test');
        component.form.course.setValue(MOCK_COURSE);
        component.form.event.setValue(MOCK_COURSE_EVENT);
        component.questionText = 'Test';
        component.inputFiles = JSON.parse('{"a": "a"}');
        fixture.detectChanges();
        expect(component.isSubmissionValid()).toBeTruthy();
    });

    // TODO - Determine how to test this.
    // it('click practice checkbox', () => {
    //     fixture.debugElement.nativeElement.querySelector('#practiceCheckbox').click();
    //     fixture.detectChanges();
    //     expect(component.isPractice).toBeTruthy();
    // });
});
