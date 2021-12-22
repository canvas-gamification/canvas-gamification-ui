import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

export type ParsonsInputFileValueType = {
    name: string,
    compile: boolean,
    lines: []
}

export class ParsonsInputFilesForm {
    static createParsonsInputFileForm(): FormGroup {
        return new FormGroup({
            name: new FormControl('', [Validators.required]),
            compile: new FormControl(false, [Validators.required]),
            lines: new FormArray([], [Validators.required])
        });
    }

    static createLinesControl(): FormControl {
        return new FormControl('', [Validators.required]);
    }

    static getNewParsonsInputFileForm(): FormGroup {
        return this.createParsonsInputFileForm();
    }
}
