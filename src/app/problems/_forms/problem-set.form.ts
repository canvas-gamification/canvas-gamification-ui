import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms"

export class ProblemSetForm {
    /**
     * Creates a FormGroup for the problem set.
     */
    static createForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            search: new UntypedFormControl(''),
            difficulty: new UntypedFormControl(null),
            parentCategory: new UntypedFormControl(null),
            subCategory: new UntypedFormControl(null),
            is_sample: new UntypedFormControl(null),
        })
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the problem set.
     */
    static extractData(form: UntypedFormGroup): ProblemSetFormData {
        return form.value
    }
}

export interface ProblemSetFormData {
    page: number,
    page_size: number,
    search: string,
    parentCategory: string,
    subCategory: string,
    difficulty: string,
    is_sample: string,
    ordering: string,
}
