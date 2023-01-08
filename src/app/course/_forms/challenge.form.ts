import {
    AbstractControl,
    AbstractControlOptions,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup, ValidationErrors, ValidatorFn,
    Validators
} from "@angular/forms"
import {TuiDay, TuiDayRange, TuiTime} from "@taiga-ui/cdk"
import {CourseEvent} from "@app/_models"
import {EventFormData} from "@app/course/_forms/course-event.form"

export interface EventQuestionSetFormData {
    category: number
    difficulty: string
    number_of_questions: number
}

export class ChallengeForm {
    /**
     * Creates another FormGroup for a Course Challenge.
     */
    static createChallengeForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(null, [Validators.required]),
            challengeType: new FormControl('', [Validators.required]),
            challengeTypeValue: new FormControl(3),
            maxTeamSize: new FormControl(null, [Validators.required]),
            startEndDate: new FormControl(
                new TuiDayRange(
                    TuiDay.currentLocal(),
                    TuiDay.currentLocal().append({day: 7})
                ),
                [Validators.required]
            ),
            startTime: new FormControl(
                TuiTime.currentLocal(),
                [Validators.required]
            ),
            endTime: new FormControl(
                TuiTime.currentLocal(),
                [Validators.required]
            ),
            challengeQuestionSets: new FormArray(
                [ChallengeForm.createChallengeQuestionSetForm()],
                [Validators.required]
            )
        }, {validator: ChallengeForm.dateValidator} as AbstractControlOptions)
    }

    static createChallengeFormWithData(challenge: CourseEvent): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(challenge.name, [Validators.required]),
            challengeType: new FormControl(
                challenge.challenge_type,
                [Validators.required]
            ),
            challengeTypeValue: new FormControl(
                challenge.challenge_type_value,
                [Validators.required]
            ),
            maxTeamSize: new FormControl(
                challenge.max_team_size,
                [Validators.required]
            ),
            startEndDate: new FormControl(
                new TuiDayRange(
                    TuiDay.fromLocalNativeDate(new Date(challenge.start_date)),
                    TuiDay.fromLocalNativeDate(new Date(challenge.end_date))
                ),
                [Validators.required]
            ),
            startTime: new FormControl(
                TuiTime.fromLocalNativeDate(new Date(challenge.start_date)),
                [Validators.required]
            ),
            endTime: new FormControl(
                TuiTime.fromLocalNativeDate(new Date(challenge.end_date)),
                [Validators.required]
            ),
            challengeQuestionSets: new FormArray(
                [ChallengeForm.createChallengeQuestionSetForm()],
                [Validators.required]
            )
        }, {validator: ChallengeForm.dateValidator} as AbstractControlOptions)
    }

    static createChallengeQuestionSetForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            category: new FormControl(''),
            difficulty: new FormControl(''),
            number_of_questions: new FormControl('')
        })
    }

    /**
     * Returns the formatted form data ready to be sent to the backend
     * @param formData - the data to be formatted, a FormGroup object
     * @param courseId - the event's courseId
     */
    static formatChallengeFormData(formData: FormGroup, courseId: number, eventId: number): EventFormData {
        return {
            id: eventId,
            course: courseId,
            name: formData.get('name').value,
            type: 'CHALLENGE',
            challenge_type: formData.get('challengeType').value,
            challenge_type_value: formData.get('challengeTypeValue').value,
            count_for_tokens: true,
            max_team_size: formData.get('maxTeamSize').value,
            start_date: this.dateAndTimeToLocal(
                formData.get('startEndDate').value.from,
                formData.get('startTime').value
            ),
            end_date: this.dateAndTimeToLocal(
                formData.get('startEndDate').value.to,
                formData.get('endTime').value
            ),
        }
    }

    static formatChallengeQuestionSetFormData(
        formControl: FormControl,
    ): EventQuestionSetFormData {
        return formControl.value
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
        const dateRange: TuiDayRange = controls.get('startEndDate').value
        const startTime: TuiTime = controls.get('startTime').value
        const endTime: TuiTime = controls.get('endTime').value
        return !dateRange.from || !dateRange.to || (dateRange.isSingleDay ? endTime.toAbsoluteMilliseconds() <= startTime.toAbsoluteMilliseconds() : false) ? {
            forbiddenDateRange: true
        } : null
    }
}
