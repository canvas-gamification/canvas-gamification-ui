import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {McqFormData} from "@app/problems/_models/mcq-form-data";

export class McqForm {
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

    static createFormWithData(data: McqFormData): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(data.title, [Validators.required]),
            difficulty: new FormControl(data.difficulty, [Validators.required]),
            course: new FormControl(data.course),
            event: new FormControl(data.event),
            category: new FormControl(data.category, [Validators.required]),
            visible_distractor_count: new FormControl(data.visible_distractor_count.toString(), [Validators.required]),
        });
    }

    static extractData(form: FormGroup): McqFormData {
        return form.value;
    }
}
