import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "@app/_models";

export class ConsentForm {
    static createAdminForm(user: User): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            consent: true,
            access_submitted_course_work: false,
            access_course_grades: false,
            legal_first_name: new FormControl(user?.first_name, [Validators.required]),
            legal_last_name: new FormControl(user?.last_name, [Validators.required]),
            student_number: new FormControl('', [Validators.required]),
            date: new FormControl(new Date().toDateString(), [Validators.required])
        });
    }

    static createStudentForm(user: User): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            consent: true,
            access_submitted_course_work: new FormControl(false),
            access_course_grades: new FormControl(false),
            legal_first_name: new FormControl(user?.first_name, [Validators.required]),
            legal_last_name: new FormControl(user?.last_name, [Validators.required]),
            student_number: new FormControl('', [Validators.required]),
            date: new FormControl(new Date().toDateString(), [Validators.required])
        });
    }

    static extractData(form: FormGroup): ConsentFormData {
        return form.value;
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
}
