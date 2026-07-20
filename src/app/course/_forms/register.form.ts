import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"

export interface CourseRegistrationFormData {
    code: string
}

export class CourseRegisterForm {
    /**
     * The following methods create the different stepper FormGroups for Course Registration
     */

    static createForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            code: new UntypedFormControl('', [Validators.required])
        })
    }

    static extractData(formData: UntypedFormGroup): CourseRegistrationFormData {
        return formData.value
    }
}
