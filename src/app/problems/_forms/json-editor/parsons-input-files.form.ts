import {UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"

export class ParsonsInputFilesForm {
    static createParsonsInputFileForm(): UntypedFormGroup {
        return new UntypedFormGroup({
            name: new UntypedFormControl('', [Validators.required]),
            compile: new UntypedFormControl(false, [Validators.required]),
            lines: new UntypedFormArray([this.createLinesControl()], [Validators.required])
        })
    }

    static createLinesControl(): UntypedFormControl {
        return new UntypedFormControl('', [Validators.required])
    }
}
