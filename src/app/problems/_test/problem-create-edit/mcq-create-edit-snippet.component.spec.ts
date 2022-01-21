import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {McqCreateEditSnippetComponent} from '../../problem-create-edit/mcq-create-edit-snippet/mcq-create-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_CHECKBOX_QUESTION} from "@app/problems/_test/mock";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiButtonModule, TuiHostedDropdownModule} from "@taiga-ui/core";
import {of} from "rxjs";
import {
    TuiFieldErrorModule,
    TuiInputModule,
    TuiRadioLabeledModule,
    TuiSelectModule,
    TuiTextAreaModule
} from "@taiga-ui/kit";
import {HttpResponse} from "@angular/common/http";
import {Question} from "@app/_models";
import {delay} from "rxjs/operators";
import {McqForm} from "@app/problems/_forms/mcq.form";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";

describe('McqCreateEditSnippetComponent', () => {
    let component: McqCreateEditSnippetComponent;
    let fixture: ComponentFixture<McqCreateEditSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TestModule, CKEditorModule, ReactiveFormsModule, TuiTextAreaModule, TuiRadioLabeledModule,
                TuiInputModule, TuiSelectModule, TuiFieldErrorModule, TuiButtonModule, TuiHostedDropdownModule
            ],
            declarations: [McqCreateEditSnippetComponent, CkEditorComponent, JsonEditorComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(McqCreateEditSnippetComponent);
        component = fixture.componentInstance;
        spyOn(component['questionService'], 'postMultipleChoiceQuestion').and.callFake(() => of(new HttpResponse<Question>()).pipe(delay(1)));
        spyOn(component['questionService'], 'putMultipleChoiceQuestion').and.callFake(() => of(new HttpResponse<Question>()).pipe(delay(1)));
        spyOn(component['router'], 'navigate').and.callThrough();
        spyOn(component, 'refreshPage').and.callThrough();
        spyOn(component['notificationsService'], 'show').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should refresh page', () => {
        component.refreshPage();
        expect(component['router'].onSameUrlNavigation).toBe('reload');
        expect(component['router'].navigate).toHaveBeenCalled();
    });

    it('should be invalid empty form', () => {
        expect(component.formGroup.valid).toBeFalse();
    });

    it('should submit', fakeAsync(() => {
        component.onSubmit();
        const submissionData = McqForm.submissionData(component.formGroup);
        expect(component['questionService'].postMultipleChoiceQuestion).toHaveBeenCalledWith(submissionData);
        tick(1);
        expect(component['notificationsService'].show).toHaveBeenCalled();
        expect(component.refreshPage).toHaveBeenCalled();
    }));

    describe('McqCreateEditSnippetComponent with Question Details', () => {
        beforeEach(() => {
            component.questionDetails = JSON.parse(JSON.stringify(MOCK_CHECKBOX_QUESTION));
            component.ngOnInit();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
            expect(component.formGroup).toBeTruthy();
            expect(component.isCheckbox).toBeTrue();
        });

        describe('Check Checkbox Answers Dialog', () => {
            beforeEach(() => {
                spyOn(component['dialogService'], 'open').and.callThrough();
                spyOn(component, 'onSubmit').and.callThrough();
            });

            it('should give no dialog and submit', () => {
                component.checkCheckboxAnswersDialog('');
                expect(component.onSubmit).toHaveBeenCalled();
            });

            it('should have one answer and show dialog', () => {
                const lenAnswers = component.form.answer.value.length;
                for (let i = 1; i < lenAnswers; ++i) {
                    component.removeAnswer(0);
                }
                component.checkCheckboxAnswersDialog('');
                expect(component['dialogService'].open).toHaveBeenCalled();
            });
        });

        it('should be valid form', () => {
            expect(component.formGroup.valid).toBeTrue();
        });

        it('should remove answer', () => {
            const ansLength = component.form.answer.value.length;
            component.removeAnswer(ansLength - 1);
            expect(component.form.answer.value.length).toBe(ansLength - 1);
        });

        it('should remove distractor', () => {
            const disLength = component.form.choices.value.length;
            component.removeDistractor(disLength - 1);
            expect(component.form.choices.value.length).toBe(disLength - 1);
        });

        it('should submit', fakeAsync(() => {
            component.onSubmit();
            const submissionData = McqForm.submissionData(component.formGroup);
            expect(component['questionService'].putMultipleChoiceQuestion).toHaveBeenCalledWith(submissionData, component.questionDetails.id);
            tick(1);
            expect(component['notificationsService'].show).toHaveBeenCalled();
            expect(component.refreshPage).toHaveBeenCalled();
        }));
    });
});
