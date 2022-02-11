import {Component} from '@angular/core';
import {AbstractControl, FormArray, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";
import {VariablesForm} from "@app/problems/_forms/json-editor/variables.form";
import {VariableEditorTypes} from "@app/_models/json_editor";
import {AbstractEditorComponent} from "@app/problems/json-editor/abstract-editor/abstract-editor.component";

@Component({
    selector: 'app-variables-editor',
    templateUrl: './variables-editor.component.html',
    styleUrls: ['./variables-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: VariablesEditorComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: VariablesEditorComponent
        },
    ]
})
export class VariablesEditorComponent extends AbstractEditorComponent {

    openNewValueDropdown = false;
    modelTypes: VariableEditorTypes[] = ['int', 'float', 'choice', 'expression', 'enum'];

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
