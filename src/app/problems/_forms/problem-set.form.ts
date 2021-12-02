import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

export class ProblemSetForm {
    /**
     * Creates a FormGroup for the problem set.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            search: new FormControl(''),
            difficulty: new FormControl(null),
            parentCategory: new FormControl(null),
            subCategory: new FormControl(null),
            is_sample: new FormControl(null),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the problem set.
     */
    static extractData(form: FormGroup): ProblemSetFormData {
        return form.value;
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
