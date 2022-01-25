import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
    ParsonsInputFilesEditorComponent
} from '../../json-editor/parsons-input-files-editor/parsons-input-files-editor.component';
import {TestModule} from "@test/test.module";
import {TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {FormArray, FormGroup, ReactiveFormsModule} from "@angular/forms";

describe('ParsonsInputFilesEditorComponent', () => {
    let component: ParsonsInputFilesEditorComponent;
    let fixture: ComponentFixture<ParsonsInputFilesEditorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ParsonsInputFilesEditorComponent],
            imports: [TestModule, ReactiveFormsModule, TuiInputModule, TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiIslandModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsonsInputFilesEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get lines', () => {
        const form = new FormGroup({lines: new FormArray([])});
        expect(component.getLines(form)).toBeTruthy();
    });

    it('should add line', () => {
        const form = new FormGroup({lines: new FormArray([])});
        spyOn(component.getLines(form), 'push').and.callThrough();
        const valLength = component.getLines(form).length;
        component.addNewLine(form);
        expect(component.getLines(form).push).toHaveBeenCalled();
        expect(component.getLines(form).length).toBe(valLength + 1);
    });

    it('should remove line', () => {
        const form = new FormGroup({lines: new FormArray([])});
        component.addNewLine(form);
        spyOn(component.getLines(form), 'removeAt').and.callThrough();
        const valLength = component.getLines(form).length;
        component.removeLine(form, 0);
        expect(component.getLines(form).removeAt).toHaveBeenCalled();
        expect(component.getLines(form).length).toBe(valLength - 1);
    });
});
