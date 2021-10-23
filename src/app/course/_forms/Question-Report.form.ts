import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

export class QuestionReportForm {
    /**
     * Creates a FormGroup for the problem set.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            description: new FormControl(''),
            description_text: new FormControl(''),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the problem set.
     */
    static extractData(form: FormGroup): ReportFormData {
        return form.value;
    }
}

export interface ReportFormData {
    description: string,
    description_text: string,
}
