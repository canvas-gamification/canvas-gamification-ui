import {Component} from '@angular/core';
import {AbstractControl, FormArray, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ParsonsInputFilesForm} from "@app/problems/_forms/json-editor/parsons-input-files.form";
import {AbstractEditorComponent} from "@app/problems/json-editor/abstract-editor/abstract-editor.component";

@Component({
    selector: 'app-parsons-input-files-editor',
    templateUrl: './parsons-input-files-editor.component.html',
    styleUrls: ['./parsons-input-files-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ParsonsInputFilesEditorComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: ParsonsInputFilesEditorComponent
        },
    ]
})
export class ParsonsInputFilesEditorComponent extends AbstractEditorComponent {

    addNewModel(): void {
        this.models.push(ParsonsInputFilesForm.createParsonsInputFileForm());
    }

    addNewLine(form: AbstractControl): void {
        this.getLines(form)?.push(ParsonsInputFilesForm.createLinesControl());
    }

    removeLine(form: AbstractControl, index: number): void {
        this.getLines(form)?.removeAt(index);
    }

    getLines(form: AbstractControl): FormArray {
        return (form as FormGroup).controls.lines as FormArray;
    }
}
