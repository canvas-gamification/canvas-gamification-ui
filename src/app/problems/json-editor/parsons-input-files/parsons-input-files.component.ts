import {Component, Input} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form";

@Component({
    selector: 'app-parsons-input-files',
    templateUrl: './parsons-input-files.component.html',
    styleUrls: ['./parsons-input-files.component.scss']
})
export class ParsonsInputFilesComponent {

    @Input() form: FormGroup;

    addNewLine(): void {
        this.getLines()?.push(VariablesForm.createValuesControl());
    }

    removeLine(index: number): void {
        this.getLines()?.removeAt(index);
    }

    getLines(): FormArray {
        return this.form.controls.lines as FormArray;
    }
}
