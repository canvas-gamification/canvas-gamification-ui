import {FormBuilder, FormControl, FormGroup,  Validators} from "@angular/forms";
import {Team} from "@app/_models/team";

export class CourseTeamRegisterForm {

    /**
     * Creates a FormGroup for a Course Event.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            'team_id': new FormControl(null, [Validators.required]),
        });
    }


    /**
     * Returns the formatted form data ready to be sent to the backend
     * @param formData - the data to be formatted, a FormGroup object
     * @param courseId - the event's courseId
     */
    static formatFormData(formData: FormGroup, courseId: number): Team {
        console.log(formData);
        return {
            team_id: formData.get('team_id').value,
            course_id: courseId
        };
    }
}
