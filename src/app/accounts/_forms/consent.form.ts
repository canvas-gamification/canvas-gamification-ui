import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {User} from "@app/_models"

export class ConsentForm {
    static createAdminForm(user: User): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            consent: true,
            access_submitted_course_work: true,
            access_course_grades: true,
            legal_first_name: new FormControl(user?.first_name, [Validators.required]),
            legal_last_name: new FormControl(user?.last_name, [Validators.required]),
            student_number: new FormControl('', [Validators.required]),
            date: new FormControl(new Date().toDateString(), [Validators.required]),
            gender: new FormControl('', [Validators.required]),
            race: new FormControl(null, [Validators.required]),
        })
    }

    static createStudentForm(user: User): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            consent: true,
            access_submitted_course_work: new FormControl(true),
            access_course_grades: new FormControl(true),
            legal_first_name: new FormControl(user?.first_name, [Validators.required]),
            legal_last_name: new FormControl(user?.last_name, [Validators.required]),
            student_number: new FormControl('', [Validators.required]),
            date: new FormControl(new Date().toDateString(), [Validators.required]),
            gender: new FormControl(null, [Validators.required]),
            race: new FormControl(null, [Validators.required]),
        })
    }

    static extractData(form: FormGroup): ConsentFormData {
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
