import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"

export class ReportQuestionForm {
    /**
     * Creates a FormGroup for the problem report.
     */
    static createForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            report: new UntypedFormControl('', [Validators.required]),
            report_details: new UntypedFormControl(''),
        })
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the problem report.
     */
    static extractData(form: UntypedFormGroup): ProblemReportFormData {
        return form.value
    }
}

export interface ProblemReportFormData {
    report: string
    report_details: string
}
