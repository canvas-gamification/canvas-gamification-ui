import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "@app/_helpers/forms/validators/confirm-password.validator";

export class ChangePasswordForm {
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            old_password: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            password2: new FormControl('', [Validators.required]),
        }, {
            validators: confirmPasswordValidator,
        });
    }

    static extractData(form: FormGroup): ChangePasswordFormData {
        return form.value;
    }
}

export interface ChangePasswordFormData {
    old_password: string;
    password: string;
    password2: string;
}
