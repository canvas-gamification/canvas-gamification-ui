import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export class CourseRegisterForm {
    /**
     * The following methods create the different stepper FormGroups for Course Registration
     */

    static createNameForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            nameControl: new FormControl('', [Validators.required])
        });
    }

    static createConfirmNameForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            confirmNameControl: new FormControl('')
        });
    }

    static createStudentNumberForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            studentNumberControl: new FormControl('', [Validators.required])
        });
    }

    static createVerifyForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            verifyControl: new FormControl('', [Validators.required])
        });
    }
}
