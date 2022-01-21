import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParsonsInputFilesComponent} from '../../json-editor/parsons-input-files/parsons-input-files.component';
import {TestModule} from "@test/test.module";
import {TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {ParsonsInputFilesForm} from "@app/problems/_forms/json-editor/parsons-input-files.form";

describe('ParsonsInputFilesComponent', () => {
    let component: ParsonsInputFilesComponent;
    let fixture: ComponentFixture<ParsonsInputFilesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ParsonsInputFilesComponent],
            imports: [TestModule, ReactiveFormsModule, TuiInputModule, TuiCheckboxLabeledModule, TuiFieldErrorModule, TuiIslandModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ParsonsInputFilesComponent);
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
