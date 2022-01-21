import {FormControl, FormGroup, Validators} from "@angular/forms";

export type TestCaseValueType = {
    input: string,
    output: string
}

export class TestCasesForm {
    static createTestCaseForm(): FormGroup {
        return new FormGroup({
            input: new FormControl('', [Validators.required]),
            output: new FormControl('', [Validators.required])
        });
    }

    static getNewTestCaseForm(): FormGroup {
        return this.createTestCaseForm();
    }
}
