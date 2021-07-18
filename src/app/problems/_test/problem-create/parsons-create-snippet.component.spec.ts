import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsCreateSnippetComponent} from '../../problem-create/parsons-create-snippet/parsons-create-snippet.component';
import {TestModule} from '@test/test.module';
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {CourseServiceMock} from "@test/course.service.mock";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/question.service.mock";
import {MOCK_COURSE, MOCK_COURSE_EVENT} from "@app/problems/_test/mock";
import {CourseService} from "@app/course/_services/course.service";
import {Router} from "@angular/router";

describe('ParsonsCreateSnippetComponent', () => {
    let component: ParsonsCreateSnippetComponent;
    let fixture: ComponentFixture<ParsonsCreateSnippetComponent>;
    let router: Router;

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
        router = TestBed.inject(Router);
        spyOn(router, 'navigate');
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
        component.form.title.setValue('Test Title');
        component.inputFiles = [{
            name: 'Test',
            compile: true,
            lines: 'a\nb\nc\n',
        }];
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledOnceWith(['problems', 'create', 'parsons']);
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
        component.isPractice = false;
        component.form.title.setValue('Test');
        component.form.difficulty.setValue('Easy');
        component.form.category.setValue('Test');
        component.form.course.setValue(MOCK_COURSE);
        component.form.event.setValue(MOCK_COURSE_EVENT);
        component.form.junit_template.setValue('Test');
        component.questionText = 'Test';
        fixture.detectChanges();
        expect(component.isSubmissionValid()).toBeTruthy();
    });
});
