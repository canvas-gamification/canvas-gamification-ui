import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsInputFilesEditorComponent} from '../../json-editor/parsons-input-files-editor/parsons-input-files-editor.component';
import {TestModule} from "@test/test.module";
import {TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {ParsonsInputFilesForm} from "@app/problems/_forms/json-editor/parsons-input-files.form";

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
        component.form = ParsonsInputFilesForm.createParsonsInputFileForm();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get lines', () => {
        expect(component.getLines()).toBeTruthy();
    });

    it('should add line', () => {
        spyOn(component.getLines(), 'push').and.callThrough();
        const valLength = component.getLines().length;
        component.addNewLine();
        expect(component.getLines().push).toHaveBeenCalled();
        expect(component.getLines().length).toBe(valLength + 1);
    });

    it('should remove line', () => {
        component.addNewLine();
        spyOn(component.getLines(), 'removeAt').and.callThrough();
        const valLength = component.getLines().length;
        component.removeLine(0);
        expect(component.getLines().removeAt).toHaveBeenCalled();
        expect(component.getLines().length).toBe(valLength - 1);
    });
});
