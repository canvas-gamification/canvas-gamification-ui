import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {VariableEditorTypes} from "@app/_models/json_editor";

export class VariablesForm {
    static createIntegersForm(): FormGroup {
        return new FormGroup({
            type: new FormControl('integer', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            min: new FormControl(0, [Validators.required]),
            max: new FormControl(0, [Validators.required])
        });
    }

    static createFloatForm(): FormGroup {
        return new FormGroup({
            type: new FormControl('float', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            min: new FormControl(0, [Validators.required]),
            max: new FormControl(0, [Validators.required]),
            precision: new FormControl(0, [Validators.required])
        });
    }

    static createEnumeratorForm(): FormGroup {
        return new FormGroup({
            type: new FormControl('enum', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            values: new FormArray([this.createValuesControl()], [Validators.required])
        });
    }

    static createExpressionForm(): FormGroup {
        return new FormGroup({
            type: new FormControl('expression', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            expression: new FormControl('', [Validators.required])
        });
    }

    static createChoiceForm(): FormGroup {
        return new FormGroup({
            type: new FormControl('choice', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            choice: new FormControl('', [Validators.required]),
            values: new FormArray([this.createValuesControl()], [Validators.required])
        });
    }

    static createValuesControl(): FormControl {
        return new FormControl('', [Validators.required]);
    }

    static getNewVariableForm(type: VariableEditorTypes): FormGroup {
        if (type === 'integer') return this.createIntegersForm();
        if (type === 'float') return this.createFloatForm();
        if (type === 'enum') return this.createEnumeratorForm();
        if (type === 'expression') return this.createExpressionForm();
        if (type === 'choice') return this.createChoiceForm();
        return undefined;
    }
}
