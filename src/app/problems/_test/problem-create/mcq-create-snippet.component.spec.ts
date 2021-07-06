import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqCreateSnippetComponent} from '../../problem-create/mcq-create-snippet/mcq-create-snippet.component';
import {TestModule} from '@test/test.module';
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {CourseServiceMock} from "@test/course.service.mock";
import {MOCK_CATEGORIES, MOCK_COURSE} from "@app/problems/_test/mock";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {ReactiveFormsModule} from "@angular/forms";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/question.service.mock";
import {CourseService} from "@app/course/_services/course.service";
import {Router} from "@angular/router";

describe('McqCreateSnippetComponent', () => {
    let component: McqCreateSnippetComponent;
    let fixture: ComponentFixture<McqCreateSnippetComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, CKEditorModule, ReactiveFormsModule],
            declarations: [McqCreateSnippetComponent, CkEditorComponent, JsonEditorComponent],
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
        fixture = TestBed.createComponent(McqCreateSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('courses and categories set', () => {
        expect(component.courses).toEqual([MOCK_COURSE]);
        expect(component.categories).toEqual(MOCK_CATEGORIES);
    });

    it('add and remove choice and answer', () => {
        expect(component.correctAnswers.length).toEqual(1);
        expect(component.distractors.length).toEqual(1);

        component.addChoice();
        component.addAnswer();
        expect(component.correctAnswers.length).toEqual(2);
        expect(component.distractors.length).toEqual(2);

        component.removeChoice(1);
        component.removeAnswer(1);
        expect(component.correctAnswers.length).toEqual(1);
        expect(component.distractors.length).toEqual(1);
    });

    it('mcq create', () => {
        component.checkBox = false;
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledOnceWith(['problems', 'create', 'MCQ']);
    });

    it('checkbox create', () => {
        component.checkBox = true;
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledOnceWith(['problems', 'create', 'checkbox']);
    });

    it('courseSelectedById', () => {
        component.courseSelectedById(0);
        expect(component.events).toEqual(MOCK_COURSE.events);
    });
});
