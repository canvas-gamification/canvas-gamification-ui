import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {DefaultCreateEditSnippetComponent} from '../../problem-create-edit/default-create-edit-snippet/default-create-edit-snippet.component';
import {TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiInputModule, TuiSelectModule} from "@taiga-ui/kit";
import {TestModule} from "@test/test.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StringifyTuiDataListPipe} from "@app/_helpers/pipes/stringify-tui-data-list.pipe";
import {McqForm} from "@app/problems/_forms/mcq.form";
import {of} from "rxjs";
import {MOCK_CATEGORIES, MOCK_DIFFICULTIES} from "@app/problems/_test/mock";
import {delay} from "rxjs/operators";
import {MOCK_COURSE1, MOCK_COURSES} from "@app/course/_test/mock";

describe('DefaultCreateEditSnippetComponent', () => {
    let component: DefaultCreateEditSnippetComponent;
    let fixture: ComponentFixture<DefaultCreateEditSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefaultCreateEditSnippetComponent, StringifyTuiDataListPipe],
            imports: [
                TestModule, ReactiveFormsModule, FormsModule, TuiInputModule, TuiFieldErrorModule,
                TuiSelectModule, TuiCheckboxLabeledModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultCreateEditSnippetComponent);
        component = fixture.componentInstance;
        component.formGroup = McqForm.createForm();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get course, categories, difficulty', fakeAsync(() => {
        spyOn(component['courseService'], 'getCourses').and.callFake(() => of(MOCK_COURSES).pipe(delay(1)));
        spyOn(component['categoryService'], 'getCategories').and.callFake(() => of(MOCK_CATEGORIES).pipe(delay(1)));
        spyOn(component['difficultyService'], 'getDifficulties').and.callFake(() => of(MOCK_DIFFICULTIES).pipe(delay(1)));
        component.ngOnInit();
        tick(1);
        expect(component.courses).toBe(MOCK_COURSES);
        expect(component.categories).toBe(MOCK_CATEGORIES);
        expect(component.difficulties).toBe(MOCK_DIFFICULTIES);
    }));

    it('should set course events for course 0', () => {
        component.courses = MOCK_COURSES;
        component.setCourseEvents(0);
        expect(component.events).toBe(MOCK_COURSE1.events);
    });

    it('should reset course if it\'s a practice', () => {
        spyOn(component.form.course, 'reset').and.callThrough();
        component.resetCourseIfPractice(true);
        expect(component.isPractice).toBeTrue();
        expect(component.form.course.reset).toHaveBeenCalled();
    });
});
