import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms"

export class ParsonsInputFilesForm {
    static createParsonsInputFileForm(): FormGroup {
        return new FormGroup({
            name: new FormControl('', [Validators.required]),
            compile: new FormControl(false, [Validators.required]),
            lines: new FormArray([this.createLinesControl()], [Validators.required])
        })
    }

    static createLinesControl(): FormControl {
        return new FormControl('', [Validators.required])
    }
}
