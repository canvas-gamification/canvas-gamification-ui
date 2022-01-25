import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VariableEditorComponent} from '../../json-editor/variable-editor/variable-editor.component';
import {TestModule} from "@test/test.module";
import {TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {FormArray, FormGroup, ReactiveFormsModule} from "@angular/forms";

describe('VariableEditorComponent', () => {
    let component: VariableEditorComponent;
    let fixture: ComponentFixture<VariableEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VariableEditorComponent],
            imports: [
                TestModule, ReactiveFormsModule, TuiInputModule, TuiCheckboxLabeledModule,
                TuiFieldErrorModule, TuiIslandModule
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VariableEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get values', () => {
        const form = new FormGroup({values: new FormArray([])});
        expect(component.getValues(form)).toBeTruthy();
    });

    it('should add value', () => {
        const form = new FormGroup({values: new FormArray([])});
        spyOn(component.getValues(form), 'push').and.callThrough();
        const valLength = component.getValues(form).length;
        component.addNewValue(form);
        expect(component.getValues(form).push).toHaveBeenCalled();
        expect(component.getValues(form).length).toBe(valLength + 1);
    });

    it('should remove value', () => {
        const form = new FormGroup({values: new FormArray([])});
        component.addNewValue(form);
        spyOn(component.getValues(form), 'removeAt').and.callThrough();
        const valLength = component.getValues(form).length;
        component.removeValue(form, 0);
        expect(component.getValues(form).removeAt).toHaveBeenCalled();
        expect(component.getValues(form).length).toBe(valLength - 1);
    });
});
