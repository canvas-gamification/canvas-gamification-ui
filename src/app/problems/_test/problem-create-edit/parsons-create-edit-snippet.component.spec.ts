import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {
    ParsonsCreateEditSnippetComponent
} from '../../problem-create-edit/parsons-create-edit-snippet/parsons-create-edit-snippet.component';
import {TestModule} from '@test/test.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MOCK_PARSONS_QUESTION} from "@app/problems/_test/mock";
import {TuiButtonModule, TuiHostedDropdownModule, TuiNotificationModule, TuiSvgModule} from "@taiga-ui/core";
import {of} from "rxjs";
import {TuiFieldErrorModule, TuiInputModule, TuiIslandModule, TuiSelectModule, TuiTextAreaModule} from "@taiga-ui/kit";
import {delay} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {Question} from "@app/_models";
import {VariablesEditorComponent} from "@app/problems/json-editor/variables-editor/variables-editor.component";
import {
    ParsonsInputFilesEditorComponent
} from "@app/problems/json-editor/parsons-input-files-editor/parsons-input-files-editor.component";
import {AsFormGroupPipe} from "@app/_helpers/pipes/as-form-group.pipe";

describe('ParsonsCreateEditSnippetComponent', () => {
    let component: ParsonsCreateEditSnippetComponent;
    let fixture: ComponentFixture<ParsonsCreateEditSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ParsonsCreateEditSnippetComponent, VariablesEditorComponent,
                ParsonsInputFilesEditorComponent, AsFormGroupPipe
            ],
            imports: [
                TestModule, ReactiveFormsModule, FormsModule, TuiTextAreaModule,
                TuiInputModule, TuiSelectModule, TuiFieldErrorModule, TuiButtonModule,
                TuiHostedDropdownModule, TuiSvgModule, TuiNotificationModule, TuiIslandModule
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsonsCreateEditSnippetComponent);
        component = fixture.componentInstance;
        spyOn(component['questionService'], 'postParsonsQuestion').and.callFake(() => of(new HttpResponse<Question>()).pipe(delay(1)));
        spyOn(component['questionService'], 'putParsonsQuestion').and.callFake(() => of(new HttpResponse<Question>()).pipe(delay(1)));
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

    it('should be valid form', () => {
        expect(component.formGroup.invalid).toBeTrue();
    });

    it('should submit', fakeAsync(() => {
        component.onSubmit();
        const data = component.formGroup.getRawValue();
        expect(component['questionService'].postParsonsQuestion).toHaveBeenCalledWith(data);
        tick(1);
        expect(component['notificationsService'].show).toHaveBeenCalled();
        expect(component.refreshPage).toHaveBeenCalled();
    }));

    describe('ParsonsCreateEditSnippetComponent with Question Details', () => {
        beforeEach(() => {
            component.questionDetails = MOCK_PARSONS_QUESTION;
            component.ngOnInit();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
            expect(component.formGroup).toBeTruthy();
        });

        it('should be valid form', () => {
            expect(component.formGroup.valid).toBeTrue();
        });

        it('should submit', fakeAsync(() => {
            component.onSubmit();
            const data = component.formGroup.getRawValue();
            expect(component['questionService'].putParsonsQuestion).toHaveBeenCalledWith(data, component.questionDetails.id);
            tick(1);
            expect(component['notificationsService'].show).toHaveBeenCalled();
            expect(component.refreshPage).toHaveBeenCalled();
        }));
    });
});
