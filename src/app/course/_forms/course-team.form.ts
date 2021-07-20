import {
    AbstractControl,
    AbstractControlOptions,
    FormBuilder,
    FormControl,
    FormGroup, ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {Team} from "@app/_models/team";

export class CourseTeamForm {

    /**
     * Creates a FormGroup for a Course Event.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            name: new FormControl(null, [Validators.required]),
        });
    }


    /**
     * Returns the formatted form data ready to be sent to the backend
     * @param formData - the data to be formatted, a FormGroup object
     * @param courseId - the event's courseId
     */
    static formatFormData(formData: FormGroup, courseId: number): Team {
        return {
            name: formData.get('name').value,
            course_id: courseId
        };
    }
}
