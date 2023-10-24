import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {confirmPasswordValidator} from "@app/_helpers/forms/validators/confirm-password.validator"

export class RegisterForm {
    static createForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            email: new FormControl(null, [Validators.required, Validators.email]),
            first_name: new FormControl(null, [Validators.required]),
            last_name: new FormControl(null, [Validators.required]),
            nickname: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            password2: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            recaptcha_key: new FormControl(null, [Validators.required])
        }, {
            validators: confirmPasswordValidator,
        })
    }

    static extractData(form: FormGroup): RegisterFormData {
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
