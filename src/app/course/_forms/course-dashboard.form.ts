import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

export class CourseDashboardForm {
    /**
     * Creates a FormGroup for the course dashboard.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            name: new FormControl(''),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the Course Dashboard.s
     */
    static extractData(form: FormGroup): CourseDashboardFormData {
        return form.value;
    }
}

export interface CourseDashboardFormData {
    name: string,
}
