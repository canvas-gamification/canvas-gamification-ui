import {Component, Input} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form";
import {VariableTypes} from "@app/problems/_forms/json-editor/json-editor.form";

@Component({
    selector: 'app-variable',
    templateUrl: './variable.component.html',
    styleUrls: ['./variable.component.scss']
})
export class VariableComponent {

    @Input() type: VariableTypes;
    @Input() form: FormGroup;

    addNewValue(): void {
        this.getValues()?.push(VariablesForm.createValuesControl());
    }

    removeValue(index: number): void {
        this.getValues()?.removeAt(index);
    }

    getValues(): FormArray {
        return this.form.controls.values as FormArray;
    }
}
