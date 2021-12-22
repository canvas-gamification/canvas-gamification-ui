import {FormControl, FormGroup, Validators} from "@angular/forms";

export type JavaInputFileValueType = {
    name: string,
    compile: boolean,
    template: string
}

export class JavaInputFilesForm {
    static createJavaInputFileForm(): FormGroup {
        return new FormGroup({
            name: new FormControl('', [Validators.required]),
            compile: new FormControl(false, [Validators.required]),
            template: new FormControl('', [Validators.required])
        });
    }

    static getNewJavaInputFileForm(): FormGroup {
        return this.createJavaInputFileForm();
    }
}
