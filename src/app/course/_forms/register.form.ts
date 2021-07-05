import {
    FormBuilder,
    FormGroup,
    Validators
} from "@angular/forms";

export class CourseRegisterForm {
    /**
     * The following methods create the different stepper FormGroups for Course Registration
     */

    static createNameForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            nameControl: ['', Validators.required]
        });
    }

    static createConfirmNameForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            confirmNameControl: ['']
        });
    }

    static createStudentNumberForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            studentNumberControl: ['', Validators.required]
        });
    }

    static createVerifyForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            verifyControl: ['', Validators.required]
        });
    }
}
