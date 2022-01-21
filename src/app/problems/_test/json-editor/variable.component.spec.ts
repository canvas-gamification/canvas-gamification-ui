import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VariableComponent} from '../../json-editor/variable/variable.component';
import {TestModule} from "@test/test.module";
import {TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form";

describe('VariableComponent', () => {
    let component: VariableComponent;
    let fixture: ComponentFixture<VariableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VariableComponent],
            imports: [
                TestModule, ReactiveFormsModule, TuiInputModule, TuiCheckboxLabeledModule,
                TuiFieldErrorModule, TuiIslandModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VariableComponent);
        component = fixture.componentInstance;
        component.form = VariablesForm.createChoiceForm();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get values', () => {
        expect(component.getValues()).toBeTruthy();
    });

    it('should add value', () => {
        spyOn(component.getValues(), 'push').and.callThrough();
        const valLength = component.getValues().length;
        component.addNewValue();
        expect(component.getValues().push).toHaveBeenCalled();
        expect(component.getValues().length).toBe(valLength + 1);
    });

    it('should remove value', () => {
        component.addNewValue();
        spyOn(component.getValues(), 'removeAt').and.callThrough();
        const valLength = component.getValues().length;
        component.removeValue(0);
        expect(component.getValues().removeAt).toHaveBeenCalled();
        expect(component.getValues().length).toBe(valLength - 1);
    });
});
