import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"

export interface CourseRegistrationFormData {
    code: string
}

export class CourseRegisterForm {
    /**
     * The following methods create the different stepper FormGroups for Course Registration
     */

    static createForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            code: new FormControl('', [Validators.required])
        })
    }

    static extractData(formData: FormGroup): CourseRegistrationFormData {
        return formData.value
    }
}
