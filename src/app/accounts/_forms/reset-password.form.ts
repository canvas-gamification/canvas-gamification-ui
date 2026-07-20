import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import {confirmPasswordValidator} from "@app/_helpers/forms/validators/confirm-password.validator"

export class ResetPasswordForm {
    static createEmailForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            email: new UntypedFormControl('', [Validators.required, Validators.email])
        })
    }

    static createPasswordForm(uid: string, token: string): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            password: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
            password2: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
            uid,
            token,
        }, {
            validators: confirmPasswordValidator,
        })
    }

    static extractEmailFormData(form: UntypedFormGroup): EmailFormData {
        return form.value
    }

    static extractPasswordFormData(form: UntypedFormGroup): PasswordFormData {
        return form.value
    }
}

export interface PasswordFormData {
    password: string;
    password2: string;
    uid: string;
    token: string;
}

export interface EmailFormData {
    email: string;
}
