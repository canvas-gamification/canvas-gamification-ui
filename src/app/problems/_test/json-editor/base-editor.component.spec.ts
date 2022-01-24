import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '@test/test.module';
import {BaseEditorComponent} from "@app/problems/json-editor/base-editor/base-editor.component";
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form";

describe('BaseEditorComponent', () => {
    let component: BaseEditorComponent;
    let fixture: ComponentFixture<BaseEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [
                BaseEditorComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseEditorComponent);
        component = fixture.componentInstance;
        component.form = VariablesForm.getNewVariableForm('integer');
        component.title = 'Title';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get form as string', () => {
        const formString = component.getFormString();
        const expectedString = '{\n  "type": "integer",\n  "name": "",\n  "min": 0,\n  "max": 0\n}';
        expect(formString).toBe(expectedString);
    });

    it('should set form from string', () => {
        const formString = '{\n  "type": "choice",\n  "name": "test",\n  "choice": "choice",\n  "values": ["1"]\n}';
        component.setFormFromString(formString);
        expect(component.form.controls.name.value).toBe('test');
        expect(component.form.controls.choice.value).toBe('choice');
        expect(component.form.controls.values.value[0]).toBe('1');
    });
});
