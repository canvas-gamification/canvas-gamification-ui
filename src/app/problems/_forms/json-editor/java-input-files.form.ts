import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"

export class JavaInputFilesForm {
    static createJavaInputFileForm(): UntypedFormGroup {
        return new UntypedFormGroup({
            name: new UntypedFormControl('', [Validators.required]),
            compile: new UntypedFormControl(false, [Validators.required]),
            template: new UntypedFormControl('', [Validators.required]),
            hidden: new UntypedFormControl(false, [Validators.required])
        })
    }
}
