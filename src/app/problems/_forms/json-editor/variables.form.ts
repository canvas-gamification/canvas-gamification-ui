import {UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import {VariableEditorTypes} from "@app/_models/json_editor"

export class VariablesForm {
    static createIntegersForm(): UntypedFormGroup {
        return new UntypedFormGroup({
            type: new UntypedFormControl('int', [Validators.required]),
            name: new UntypedFormControl('', [Validators.required]),
            min: new UntypedFormControl(0, [Validators.required]),
            max: new UntypedFormControl(0, [Validators.required])
        })
    }

    static createFloatForm(): UntypedFormGroup {
        return new UntypedFormGroup({
            type: new UntypedFormControl('float', [Validators.required]),
            name: new UntypedFormControl('', [Validators.required]),
            min: new UntypedFormControl(0, [Validators.required]),
            max: new UntypedFormControl(0, [Validators.required]),
            precision: new UntypedFormControl(0, [Validators.required])
        })
    }

    static createEnumeratorForm(): UntypedFormGroup {
        return new UntypedFormGroup({
            type: new UntypedFormControl('enum', [Validators.required]),
            name: new UntypedFormControl('', [Validators.required]),
            values: new UntypedFormArray([this.createValuesControl()], [Validators.required])
        })
    }

    static createExpressionForm(): UntypedFormGroup {
        return new UntypedFormGroup({
            type: new UntypedFormControl('expression', [Validators.required]),
            name: new UntypedFormControl('', [Validators.required]),
            expression: new UntypedFormControl('', [Validators.required])
        })
    }

    static createChoiceForm(): UntypedFormGroup {
        return new UntypedFormGroup({
            type: new UntypedFormControl('choice', [Validators.required]),
            name: new UntypedFormControl('', [Validators.required]),
            choice: new UntypedFormControl('', [Validators.required]),
            values: new UntypedFormArray([this.createValuesControl()], [Validators.required])
        })
    }

    static createValuesControl(): UntypedFormControl {
        return new UntypedFormControl('', [Validators.required])
    }

    static getNewVariableForm(type: VariableEditorTypes): UntypedFormGroup {
        if (type === 'int') return this.createIntegersForm()
        if (type === 'float') return this.createFloatForm()
        if (type === 'enum') return this.createEnumeratorForm()
        if (type === 'expression') return this.createExpressionForm()
        if (type === 'choice') return this.createChoiceForm()
        return undefined
    }
}
