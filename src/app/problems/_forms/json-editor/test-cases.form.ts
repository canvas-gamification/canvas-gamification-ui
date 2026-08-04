import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"

export class TestCasesForm {
    static createTestCaseForm(): UntypedFormGroup {
        return new UntypedFormGroup({
            input: new UntypedFormControl('', [Validators.required]),
            output: new UntypedFormControl('', [Validators.required])
        })
    }
}
