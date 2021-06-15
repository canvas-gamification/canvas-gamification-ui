import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {JavaFormData} from "@app/problems/_models/java-form-data";

export class JavaForm {
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(null, [Validators.required]),
            difficulty: new FormControl(null, [Validators.required]),
            category: new FormControl(null),
            course: new FormControl(null),
            event: new FormControl(null),
            junit_template: new FormControl(null, [Validators.required]),
            text: new FormControl(null, [Validators.required]),
        });
    }

    static extractData(form: FormGroup): JavaFormData {
        return form.value;
    }
}
