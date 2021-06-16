import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {JavaFormData} from "@app/problems/_models/java/java-form-data";

export class ProblemSetForm {
    /**
     * Creates a FormGroup for the problem set.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            search: new FormControl(''),
            difficulty: new FormControl(''),
            parentCategory: new FormControl(''),
            subCategory: new FormControl(''),
            is_sample: new FormControl(''),
        });
    }

    /**
     * Extracts the data from the FormGroup.
     * @param form - The FormGroup for the problem set.
     */
    static extractData(form: FormGroup): JavaFormData {
        return form.value;
    }
}
