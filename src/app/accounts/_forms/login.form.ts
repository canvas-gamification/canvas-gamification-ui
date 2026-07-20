import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"

export class LoginForm {
    static createForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            email: new UntypedFormControl(null, [Validators.required, Validators.email]),
            password: new UntypedFormControl(null, [Validators.required]),
        })
    }

    static extractData(form: UntypedFormGroup): LoginFormData {
        return form.value
    }
}

export interface LoginFormData {
    username: string;
    password: string;
}
