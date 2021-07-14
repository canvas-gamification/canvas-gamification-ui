import {
    AbstractControl,
    AbstractControlOptions,
    FormBuilder,
    FormControl,
    FormGroup, ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {CourseEvent} from "@app/_models";

export class CourseEventForm {
    /**
     * Custom validator for date validity
     */
    private static dateValidator: ValidatorFn = (controls: AbstractControl): ValidationErrors | null => {
        const start = controls.get('startPicker');
        const end = controls.get('endPicker');
        return start && end && start.value >= end.value ? {
            forbiddenDateRange: true
        } : null;
    };

    /**
     * Creates a FormGroup for a Course Event.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            name: new FormControl(null, [Validators.required]),
            type: new FormControl('', [Validators.required]),
            countForTokens: new FormControl(false, [Validators.required]),
            startPicker: new FormControl(new Date(), [Validators.required]),
            endPicker: new FormControl(new Date(), [Validators.required])
        }, {validator: CourseEventForm.dateValidator} as AbstractControlOptions);
    }

    /**
     * Creates a FormGroup for a Course Event with existing data.
     * @param event - The event.
     */
    static createFormWithData(event: CourseEvent): FormGroup {
        const builder = new FormBuilder();
        return builder.group({
            name: new FormControl(event.name, [Validators.required]),
            type: new FormControl(event.type, [Validators.required]),
            countForTokens: new FormControl(event.count_for_tokens, [Validators.required]),
            startPicker: new FormControl(new Date(event.start_date), [Validators.required]),
            endPicker: new FormControl(new Date(event.end_date), [Validators.required])
        }, {validator: CourseEventForm.dateValidator} as AbstractControlOptions);
    }

    /**
     * Returns the formatted form data ready to be sent to the backend
     * @param formData - the data to be formatted, a FormGroup object
     * @param courseId - the event's courseId
     * @param eventId - the event's ID if it already exists
     */
    static formatFormData(formData: FormGroup, courseId: number, eventId: number): CourseEvent {
        return {
            id: eventId,
            name: formData.get('name').value,
            type: formData.get('type').value,
            count_for_tokens: formData.get('countForTokens').value,
            start_date: formData.get('startPicker').value,
            end_date: formData.get('endPicker').value,
            course_id: courseId
        };
    }
}
