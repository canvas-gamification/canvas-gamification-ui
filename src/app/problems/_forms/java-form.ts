import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {JavaFormData} from "@app/problems/_models/java-form-data";

export class JavaForm {
    /**
     * Creates a FormGroup for a Java question.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(null, [Validators.required]),
            difficulty: new FormControl(null, [Validators.required]),
            category: new FormControl(null),
            course: new FormControl(null),
            event: new FormControl(null),
            junit_template: new FormControl(null, [Validators.required]),
        });
    }

    /**
     * Creates a FormGroup for a Java question with existing data.
     * @param data - The existing data for the question.
     */
    static createFormWithData(data: JavaFormData): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(data.title, [Validators.required]),
            difficulty: new FormControl(data.difficulty, [Validators.required]),
            category: new FormControl(data.category),
            course: new FormControl(data.course),
            event: new FormControl(data.event),
            junit_template: new FormControl(data.junit_template, [Validators.required]),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the question.
     */
    static extractData(form: FormGroup): JavaFormData {
        return form.value;
    }
}
