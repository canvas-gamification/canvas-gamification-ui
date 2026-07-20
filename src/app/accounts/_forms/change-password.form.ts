import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import {confirmPasswordValidator} from "@app/_helpers/forms/validators/confirm-password.validator"

export class ChangePasswordForm {
    static createForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            old_password: new UntypedFormControl('', [Validators.required]),
            password: new UntypedFormControl('', [Validators.required]),
            password2: new UntypedFormControl('', [Validators.required]),
        }, {
            validators: confirmPasswordValidator,
        })
    }

    static extractData(form: UntypedFormGroup): ChangePasswordFormData {
        return form.value
    }
}

export interface ChangePasswordFormData {
    old_password: string;
    password: string;
    password2: string;
}
