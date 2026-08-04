import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import {User} from "@app/_models"

export class ConsentForm {
    static createAdminForm(user: User): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            consent: true,
            access_submitted_course_work: true,
            access_course_grades: true,
            legal_first_name: new UntypedFormControl(user?.first_name, [Validators.required]),
            legal_last_name: new UntypedFormControl(user?.last_name, [Validators.required]),
            student_number: new UntypedFormControl('', [Validators.required]),
            date: new UntypedFormControl(new Date().toDateString(), [Validators.required]),
            gender: new UntypedFormControl('', [Validators.required]),
            race: new UntypedFormControl(null, [Validators.required]),
        })
    }

    static createStudentForm(user: User): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            consent: true,
            access_submitted_course_work: new UntypedFormControl(true),
            access_course_grades: new UntypedFormControl(true),
            legal_first_name: new UntypedFormControl(user?.first_name, [Validators.required]),
            legal_last_name: new UntypedFormControl(user?.last_name, [Validators.required]),
            student_number: new UntypedFormControl('', [Validators.required]),
            date: new UntypedFormControl(new Date().toDateString(), [Validators.required]),
            gender: new UntypedFormControl(null, [Validators.required]),
            race: new UntypedFormControl(null, [Validators.required]),
        })
    }

    static extractData(form: UntypedFormGroup): ConsentFormData {
        return {
            ...form.value,
            race: form.value.race.join(','),
        }
    }
}

export interface ConsentFormData {
    consent: boolean;
    access_submitted_course_work: boolean;
    access_course_grades: boolean;
    legal_first_name: string;
    legal_last_name: string;
    student_number: string;
    date: string;
    gender: string;
    race: string;
}
