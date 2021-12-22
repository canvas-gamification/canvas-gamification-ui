import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JsonEditorComponent} from '../../json-editor/json-editor.component';
import {TestModule} from '@test/test.module';
import {JavaInputFilesComponent} from "@app/problems/json-editor/java-input-files/java-input-files.component";
import {ParsonsInputFilesComponent} from "@app/problems/json-editor/parsons-input-files/parsons-input-files.component";
import {VariableComponent} from "@app/problems/json-editor/variable/variable.component";
import {TestCasesComponent} from "@app/problems/json-editor/test-cases/test-cases.component";
import {FormGroup} from "@angular/forms";

describe('JsonEditorComponent', () => {
    let component: JsonEditorComponent;
    let fixture: ComponentFixture<JsonEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                JsonEditorComponent, JavaInputFilesComponent, ParsonsInputFilesComponent,
                VariableComponent, TestCasesComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JsonEditorComponent);
        component = fixture.componentInstance;
        component.name = 'variables';
        component.values = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add new value', () => {
        spyOn(component.getValues(), 'push').and.callThrough();
        const valLength = component.getValues().length;
        component.addNewValue('integer');
        expect(component.getValues().length).toBe(valLength + 1);
        expect(component.getValues().push).toHaveBeenCalled();
    });

    it('should remove value', () => {
        spyOn(component.getValues(), 'push').and.callThrough();
        component.addNewValue('integer');
        const valLength = component.getValues().length;
        component.removeValue(0);
        expect(component.getValues().length).toBe(valLength - 1);
    });

    it('should get form as string', () => {
        component.addNewValue('integer');
        const formString = component.getFormString(component.getValues().controls[0]);
        const expectedString = '{\n  "type": "integer",\n  "name": "",\n  "min": 0,\n  "max": 0\n}';
        expect(formString).toBe(expectedString);
    });

    it('should set form from string', () => {
        const formString = '{\n  "type": "choice",\n  "name": "test",\n  "choice": "choice",\n  "values": ["1"]\n}';
        component.addNewValue('choice');
        component.setFormFromString(component.getValues().controls[0], formString);
        expect((component.getValues().controls[0] as FormGroup).controls.name.value).toBe('test');
        expect((component.getValues().controls[0] as FormGroup).controls.choice.value).toBe('choice');
        expect((component.getValues().controls[0] as FormGroup).controls.values.value[0]).toBe('1');
    });
});
