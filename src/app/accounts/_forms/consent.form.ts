import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export class ConsentForm {
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            consent: true,
            legal_first_name: new FormControl('', [Validators.required]),
            legal_last_name: new FormControl('', [Validators.required]),
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
    legal_first_name: string;
    legal_last_name: string;
    student_number: string;
    date: string;
}
