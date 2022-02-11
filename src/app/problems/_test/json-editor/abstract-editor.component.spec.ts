import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '@test/test.module';
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form";
import {AbstractEditorComponent} from "@app/problems/json-editor/abstract-editor/abstract-editor.component";
import {FormArray, FormGroup} from "@angular/forms";

describe('AbstractEditorComponent', () => {
    let component: AbstractEditorComponent;
    let fixture: ComponentFixture<AbstractEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                AbstractEditorComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AbstractEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get form as string', () => {
        component.models = new FormArray([VariablesForm.getNewVariableForm('int')]);
        const formString = component.getFormString(component.models.at(0));
        const expectedString = '{\n  "type": "int",\n  "name": "",\n  "min": 0,\n  "max": 0\n}';
        expect(formString).toBe(expectedString);
    });

    it('should set form from string', () => {
        component.models = new FormArray([VariablesForm.getNewVariableForm('choice')]);
        const formString = '{\n  "type": "choice",\n  "name": "test",\n  "choice": "choice",\n  "values": ["1"]\n}';
        component.setFormFromString(component.models.at(0), formString);
        expect((component.models.at(0) as FormGroup).controls.name.value).toBe('test');
        expect((component.models.at(0) as FormGroup).controls.choice.value).toBe('choice');
        expect((component.models.at(0) as FormGroup).controls.values.value[0]).toBe('1');
    });
});
