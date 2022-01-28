import {Component} from '@angular/core';
import {AbstractControl, FormArray, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form";
import {VariableEditorTypes} from "@app/_models/json_editor";
import {AbstractEditorComponent} from "@app/problems/json-editor/abstract-editor/abstract-editor.component";

@Component({
    selector: 'app-variable-editor',
    templateUrl: './variable-editor.component.html',
    styleUrls: ['./variable-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: VariableEditorComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: VariableEditorComponent
        },
    ]
})
export class VariableEditorComponent extends AbstractEditorComponent {

    openNewValueDropdown = false;
    modelTypes: VariableEditorTypes[] = ['integer', 'float', 'choice', 'expression', 'enum'];

    addNewModel(type: VariableEditorTypes): void {
        this.models.push(VariablesForm.getNewVariableForm(type));
    }

    addNewValue(form: AbstractControl): void {
        this.getValues(form)?.push(VariablesForm.createValuesControl());
    }

    removeValue(form: AbstractControl, index: number): void {
        this.getValues(form)?.removeAt(index);
    }

    getValues(form: AbstractControl): FormArray {
        return (form as FormGroup).controls.values as FormArray;
    }
}
