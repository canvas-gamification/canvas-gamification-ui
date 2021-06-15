import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {McqFormData} from "@app/problems/_models/mcq-form-data";

export class McqCreateForm {
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(null, [Validators.required]),
            difficulty: new FormControl(null, [Validators.required]),
            course: new FormControl(null),
            event: new FormControl(null),
            category: new FormControl(null, [Validators.required]),
            visible_distractor_count: new FormControl(null, [Validators.required]),
        });
    }

    static extractData(form: FormGroup): McqFormData {
        return form.value;
    }
}
