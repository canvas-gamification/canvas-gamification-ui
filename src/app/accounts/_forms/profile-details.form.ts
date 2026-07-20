import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"

export class ProfileDetailsForm {
    static createForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            first_name: new UntypedFormControl('', [Validators.required]),
            last_name: new UntypedFormControl('', [Validators.required]),
            nickname: new UntypedFormControl('', [Validators.required]),
            email: new UntypedFormControl('', [Validators.required, Validators.email])
        })
    }

    static updateData(form: UntypedFormGroup, data: ProfileDetailsFormData): void {
        form.controls.first_name.setValue(data.first_name)
        form.controls.last_name.setValue(data.last_name)
        form.controls.nickname.setValue(data.nickname)
        form.controls.email.setValue(data.email)
    }

    static extractData(form: UntypedFormGroup): ProfileDetailsFormData {
        return form.value
    }
}

export interface ProfileDetailsFormData {
    first_name: string
    last_name: string
    nickname: string
    email: string
}
