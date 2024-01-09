import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"

export class ProfileDetailsForm {
    static createForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl('', [Validators.required]),
            nickname: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
        })
    }

    static updateData(form: FormGroup, data: ProfileDetailsFormData): void {
        form.controls.first_name.setValue(data.first_name)
        form.controls.last_name.setValue(data.last_name)
        form.controls.nickname.setValue(data.nickname)
        form.controls.email.setValue(data.email)
    }

    static extractData(form: FormGroup): ProfileDetailsFormData {
        return form.value
    }
}

export interface ProfileDetailsFormData {
    first_name: string
    last_name: string
    nickname: string
    email: string
}
