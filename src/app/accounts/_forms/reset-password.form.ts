import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "@app/_helpers/confirm-password.validator";

export class ResetPasswordForm {
    static createEmailForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            email: new FormControl('', [Validators.required, Validators.email])
        });
    }

    static createPasswordForm(uid: string, token: string): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            password: new FormControl('', [Validators.required]),
            password2: new FormControl('', [Validators.required]),
            uid,
            token,
        },{
            validators: confirmPasswordValidator,
        });
    }

    static extractEmailFormData(form: FormGroup): EmailFormData {
        return form.value;
    }

    static extractPasswordFormData(form: FormGroup): PasswordFormData {
        return form.value;
    }
}

export interface PasswordFormData {
    password: string;
    password2: string;
    uuid: string;
    token: string;
}

export interface EmailFormData {
    email: string;
}
