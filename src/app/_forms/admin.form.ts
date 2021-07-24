import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

export class AdminForm {
    /**
     * Creates a FormGroup for the problem set.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            role: new FormControl(''),
            courseName : new FormControl(''),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the problem set.
     */
    static extractData(form: FormGroup): ListUserFormData {
        return form.value;
    }
}
export interface ListUserFormData {
    role: string,
    courseName : string,
}
