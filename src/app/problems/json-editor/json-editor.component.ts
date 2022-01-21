import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {
    JavaInputFileTypes,
    JsonEditorForm,
    JSONValueTypes,
    ParsonsInputFileTypes, TestCaseTypes,
    VariableTypes
} from "@app/problems/_forms/json-editor/json-editor.form";
import {VariableValueType} from "@app/problems/_forms/json-editor/variables.form";
import {JavaInputFileValueType} from "@app/problems/_forms/json-editor/java-input-files.form";
import {ParsonsInputFileValueType} from "@app/problems/_forms/json-editor/parsons-input-files.form";
import {TestCaseValueType} from "@app/problems/_forms/json-editor/test-cases.form";

@Component({
    selector: 'app-json-editor',
    templateUrl: './json-editor.component.html',
    styleUrls: ['./json-editor.component.scss'],
})
export class JsonEditorComponent implements OnInit {
    @Input() name: JSONValueTypes;
    @Input() values: VariableValueType[] | JavaInputFileValueType[] | ParsonsInputFileValueType[] | TestCaseValueType[];
    @Output() readonly valuesChange = new EventEmitter<VariableValueType[] | JavaInputFileValueType[] | ParsonsInputFileValueType[] | TestCaseValueType[]>();

    valuesForm: FormGroup;
    valueTypes: VariableTypes[] | JavaInputFileTypes[] | ParsonsInputFileTypes[] | TestCaseTypes[];
    openNewValueDropdown = false;

    ngOnInit(): void {
        this.valuesForm = JsonEditorForm.createVariablesForm(this.name);
        this.valueTypes = JsonEditorForm.getTypes(this.name);
        this.values.forEach(value => {
            this.addNewValue(value.type ? value.type : undefined);
        });
        this.getValues().controls.forEach((control, index) => {
            this.setFormFromString(control, JSON.stringify(this.values[index]));
        });

        this.valuesForm.valueChanges.subscribe(() => {
            this.valuesChange.emit(JSON.parse(this.getFormString(this.getValues())));
        });
    }

    getValues(): FormArray {
        return this.valuesForm.controls[this.name] as FormArray;
    }

    addNewValue(variableType: VariableTypes | JavaInputFileTypes | ParsonsInputFileTypes | TestCaseTypes): void {
        this.getValues().push(JsonEditorForm.getNewType(this.name, variableType));
    }

    removeValue(index: number): void {
        this.getValues().removeAt(index);
    }

    /**
     * Get a form as a JSON string value
     * @param abstractFormGroup form to be converted
     */
    getFormString(abstractFormGroup: AbstractControl): string {
        const form = abstractFormGroup as FormGroup;
        return JSON.stringify(form.getRawValue(), null, 2);
    }

    /**
     * Convert a string into a JSON value, then set the form values with that data
     * Will only set the value of one level of array control children.
     * @param abstractFormGroup
     * @param value
     */
    setFormFromString(abstractFormGroup: AbstractControl, value: string): void {
        try {
            const form = abstractFormGroup as FormGroup;
            const jsonParsed = JSON.parse(value);
            if (form.value.type) jsonParsed['type'] = form.value.type;
            Object.entries(jsonParsed).forEach(([key, value]) => {
                const formControl = form.controls[key];
                if (formControl) {
                    if (formControl instanceof FormArray) {
                        if (!(value instanceof Array)) throw SyntaxError;
                        const formArray = formControl as FormArray;
                        formArray.clear();
                        value.forEach(value1 => {
                            formArray.push(JsonEditorForm.getNewValueControl(this.name, value1));
                        });
                    } else {
                        formControl.setValue(value);
                    }
                }
            });
        } catch (SyntaxError) {
            return;
        }
    }
}
