import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import {confirmPasswordValidator} from "@app/_helpers/forms/validators/confirm-password.validator"

export class RegisterForm {
    static createForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            email: new UntypedFormControl(null, [Validators.required, Validators.email]),
            first_name: new UntypedFormControl(null, [Validators.required]),
            last_name: new UntypedFormControl(null, [Validators.required]),
            nickname: new UntypedFormControl(null, [Validators.required]),
            password: new UntypedFormControl(null, [Validators.required, Validators.minLength(8)]),
            password2: new UntypedFormControl(null, [Validators.required, Validators.minLength(8)]),
            recaptcha_key: new UntypedFormControl(null, [Validators.required])
        }, {
            validators: confirmPasswordValidator,
        })
    }

    static extractData(form: UntypedFormGroup): RegisterFormData {
        return form.getRawValue()
    }
}

export interface RegisterFormData {
    email: string;
    first_name: string
    last_name: string
    nickname: string
    password: string
    password2: string
    recaptcha_key: string
}
