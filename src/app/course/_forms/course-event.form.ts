import {
    AbstractControl,
    AbstractControlOptions, FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms"
import {CourseEvent} from "@app/_models"
import {TuiDay, TuiDayRange, TuiTime} from "@taiga-ui/cdk"

export interface ChallengeFormData {
    course_id: number,
    name: string
    type: string
    challenge_type: string
    challenge_type_value?: number
    count_for_tokens: boolean;
    max_team_size?: number
    start_date?: Date
    end_date?: Date
    featured: boolean
}

export interface ChallengeQuestionSetFormData {
    event_id: number
    category: number
    difficulty: string
    number_of_questions: number
}

export class CourseEventForm {
    /**
     * Creates a FormGroup for a Course Event.
     */
    static createForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(null, [Validators.required]),
            type: new FormControl('', [Validators.required]),
            countForTokens: new FormControl(false, [Validators.required]),
            startEndDatePicker: new FormControl(
                new TuiDayRange(TuiDay.currentLocal(), TuiDay.currentLocal().append({day: 7})),
                [Validators.required]
            ),
            startTimePicker: new FormControl(TuiTime.currentLocal(), [Validators.required]),
            endTimePicker: new FormControl(TuiTime.currentLocal(), [Validators.required])
        }, {validator: CourseEventForm.dateValidator} as AbstractControlOptions)
    }

    /**
     * Creates a FormGroup for a Course Event with existing data.
     * @param event - The event.
     */
    static createFormWithData(event: CourseEvent): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(event.name, [Validators.required]),
            type: new FormControl(event.type, [Validators.required]),
            countForTokens: new FormControl(event.count_for_tokens, [Validators.required]),
            startEndDatePicker: new FormControl(
                new TuiDayRange(TuiDay.fromLocalNativeDate(new Date(event.start_date)), TuiDay.fromLocalNativeDate(new Date(event.end_date))),
                [Validators.required]
            ),
            startTimePicker: new FormControl(TuiTime.fromLocalNativeDate(new Date(event.start_date)), [Validators.required]),
            endTimePicker: new FormControl(TuiTime.fromLocalNativeDate(new Date(event.end_date)), [Validators.required]),
        }, {validator: CourseEventForm.dateValidator} as AbstractControlOptions)
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
            start_date: this.dateAndTimeToLocal(
                formData.get('startEndDatePicker').value.from,
                formData.get('startTimePicker').value
            ),
            end_date: this.dateAndTimeToLocal(
                formData.get('startEndDatePicker').value.to,
                formData.get('endTimePicker').value
            ),
            course: courseId,
            is_not_available_yet: false,
            is_closed: false,
            featured: false,
            max_team_size: 3,
        }
    }

    /**
     * Converts TuiDay and TuiTime to native Date object
     * @param date - TuiDay object
     * @param time - TuiTime object
     */
    static dateAndTimeToLocal(date: TuiDay, time: TuiTime): Date {
        return new Date(date.toLocalNativeDate().getTime() + time.toAbsoluteMilliseconds())
    }

    /**
     * Custom validator for date validity
     */
    private static dateValidator: ValidatorFn = (controls: AbstractControl): ValidationErrors | null => {
        const dateRange: TuiDayRange = controls.get('startEndDatePicker').value
        const startTime: TuiTime = controls.get('startTimePicker').value
        const endTime: TuiTime = controls.get('endTimePicker').value
        return !dateRange.from || !dateRange.to || (dateRange.isSingleDay ? endTime.toAbsoluteMilliseconds() <= startTime.toAbsoluteMilliseconds() : false) ? {
            forbiddenDateRange: true
        } : null
    }


    /**
     * Creates another FormGroup for a Course Challenge.
     */
    static createChallengeForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(null, [Validators.required]),
            challengeType: new FormControl('', [Validators.required]),
            challengeTypeValue:  new FormControl(3),
            maxTeamSize: new FormControl(null, [Validators.required]),
            startEndDatePicker: new FormControl(
                new TuiDayRange(
                    TuiDay.currentLocal(),
                    TuiDay.currentLocal().append({day: 7})
                ),
                [Validators.required]
            ),
            startTimePicker: new FormControl(
                TuiTime.currentLocal(),
                [Validators.required]
            ),
            endTimePicker: new FormControl(
                TuiTime.currentLocal(),
                [Validators.required]
            ),
            challengeQuestionSets: new FormArray(
                [CourseEventForm.createChallengeQuestionSetForm()],
                [Validators.required]
            )
        },  {validator: CourseEventForm.dateValidator} as AbstractControlOptions)
    }

    static createChallengeFormWithData(challenge: CourseEvent): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(challenge.name, [Validators.required]),
            challengeType: new FormControl(
                challenge.challenge_type,
                [Validators.required]
            ),
            challengeTypeValue:  new FormControl(
                challenge.challenge_type_value,
                [Validators.required]
            ),
            maxTeamSize: new FormControl(
                challenge.max_team_size,
                [Validators.required]
            ),
            startEndDatePicker: new FormControl(
                new TuiDayRange(
                    TuiDay.fromLocalNativeDate(new Date(challenge.start_date)),
                    TuiDay.fromLocalNativeDate(new Date(challenge.end_date))
                ),
                [Validators.required]
            ),
            startTimePicker: new FormControl(
                TuiTime.fromLocalNativeDate(new Date(challenge.start_date)),
                [Validators.required]
            ),
            endTimePicker: new FormControl(
                TuiTime.fromLocalNativeDate(new Date(challenge.end_date)),
                [Validators.required]
            ),
        }, {validator: CourseEventForm.dateValidator} as AbstractControlOptions)
    }

    static createChallengeQuestionSetForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            category: new FormControl('', [Validators.required]),
            difficulty: new FormControl('', [Validators.required]),
            number_of_questions: new FormControl('', [Validators.required])
        })
    }

    //Need a new relationship with the Event model to relate the questions
    // static createChallengeQuestionSetFromChallengeForm(challenge:CourseEvent): FormGroup {
    //     const builder = new FormBuilder()
    //     return builder.group({
    //         category: new FormControl('', [Validators.required]),
    //         difficulty: new FormControl('', [Validators.required]),
    //         number_of_questions: new FormControl('', [Validators.required])
    //     })
    // }

    /**
     * Returns the formatted form data ready to be sent to the backend
     * @param formData - the data to be formatted, a FormGroup object
     * @param courseId - the event's courseId
     */
    static formatChallengeFormData(formData: FormGroup, courseId: number): ChallengeFormData{
        return {
            course_id: courseId,
            name: formData.get('name').value,
            type: 'CHALLENGE',
            challenge_type: formData.get('challengeType').value,
            challenge_type_value: formData.get('challengeTypeValue').value,
            count_for_tokens: true,
            max_team_size: formData.get('maxTeamSize').value,
            start_date: this.dateAndTimeToLocal(
                formData.get('startEndDatePicker').value.from,
                formData.get('startTimePicker').value
            ),
            end_date: this.dateAndTimeToLocal(
                formData.get('startEndDatePicker').value.to,
                formData.get('endTimePicker').value
            ),
            featured: false,
        }
    }

    //createChallengeQuestionSetForm
    static formatChallengeQuestionSetFormData(
        formControl: FormControl,
        eventId: number
    ): ChallengeQuestionSetFormData {
        return {
            event_id: eventId,
            ...formControl.value
        }
    }
}
