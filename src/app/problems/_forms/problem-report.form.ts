import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export class ReportQuestionForm {
    /**
     * Creates a FormGroup for the problem report.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            report: new FormControl('', [Validators.required]),
            report_details: new FormControl(''),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the problem report.
     */
    static extractData(form: FormGroup): ProblemReportFormData {
        return form.value;
    }
}

export interface ProblemReportFormData {
    report: string
    report_details: string
}
