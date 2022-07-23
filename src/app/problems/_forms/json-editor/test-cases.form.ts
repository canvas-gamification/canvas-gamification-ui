import {FormControl, FormGroup, Validators} from "@angular/forms"

export class TestCasesForm {
    static createTestCaseForm(): FormGroup {
        return new FormGroup({
            input: new FormControl('', [Validators.required]),
            output: new FormControl('', [Validators.required])
        })
    }
}
