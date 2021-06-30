import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export class LoginForm {
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            username: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required]),
        });
    }

    static extractData(form: FormGroup): LoginFormData {
        return form.value;
    }
}

export interface LoginFormData {
    username: string;
    password: string;
}
