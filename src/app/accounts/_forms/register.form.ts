import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "@app/_helpers/confirm-password.validator";

export class RegisterForm {
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            password2: new FormControl(null, [Validators.required,  Validators.minLength(8)]),
            recaptcha_key: new FormControl(null, [Validators.required])
        }, {
            validators: confirmPasswordValidator,
        });
    }

    static extractData(form: FormGroup): RegisterFormData {
        return form.value;
    }
}

export interface RegisterFormData {
    email: string;
    password: string;
    password2: string;
    recaptcha_key: string;
}
