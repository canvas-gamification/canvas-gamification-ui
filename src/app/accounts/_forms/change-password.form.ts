import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export class ChangePasswordForm {
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            old_password: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            password2: new FormControl('', [Validators.required])
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
