import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ParsonsFormData} from "@app/problems/_models/parsons/parsons-form-data";

export class ParsonsForm {
    /**
     * Creates a FormGroup for a Parsons question.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(null, [Validators.required]),
            difficulty: new FormControl(null, [Validators.required]),
            category: new FormControl(null),
            course: new FormControl(null),
            event: new FormControl(null),
            junit_template: new FormControl(null),
            lines: new FormControl(null, [Validators.required]),
            additional_file_name: new FormControl(null),
        });
    }

    /**
     * Creates a FormGroup for a Parsons question with existing data.
     * @param data - The existing data for the question.
     */
    static createFormWithData(data: ParsonsFormData): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            title: new FormControl(data.title, [Validators.required]),
            difficulty: new FormControl(data.difficulty, [Validators.required]),
            category: new FormControl(data.category),
            course: new FormControl(data.course),
            event: new FormControl(data.event),
            junit_template: new FormControl(data.junit_template),
            lines: new FormControl(data.lines, [Validators.required]),
            additional_file_name: new FormControl(data.additional_file_name),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the question.
     */
    static extractData(form: FormGroup): ParsonsFormData {
        return form.value;
    }
}
