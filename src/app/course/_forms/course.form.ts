import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms"
import {TuiDay, TuiDayRange} from "@taiga-ui/cdk"
import {Course} from "@app/_models"


export interface CourseFormData {
    name: string
    description: string
    url: string
    start_date: Date
    end_date: Date
    registration_mode: string
    registration_code: string
    token: string
    course_id: number
}

const registrationModeMapper = {
    ["Open"]: "OPEN",
    ["Private"]: "CODE",
}

const registrationModeMapperReverse = {
    ["OPEN"]: "Open",
    ["CODE"]: "Private",
}

export class CourseForm {
    static createCourseForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            url: new FormControl(
                '',
                [Validators.pattern(
                    '(https?://)([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
                )]
            ),
            date: new FormControl(
                new TuiDayRange(
                    TuiDay.currentLocal(),
                    TuiDay.currentLocal().append({day: 7})
                ),
                [Validators.required]
            ),
            registrationMode: new FormControl('', [Validators.required]),
            registrationCode: new FormControl(''),
        }, {validator: CourseForm.dateValidator})
    }

    static createCourseFormWithData(course: Course): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            name: new FormControl(course.name, [Validators.required]),
            description: new FormControl(course.description),
            url: new FormControl(
                course.url,
                [Validators.pattern(
                    '(https?://)([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
                )]
            ),
            date: new FormControl(
                new TuiDayRange(
                    TuiDay.currentLocal(),
                    TuiDay.currentLocal().append({day: 7})
                ),
                [Validators.required]
            ),
            registrationMode: new FormControl(
                registrationModeMapperReverse[course.registration_mode],
                [Validators.required]
            ),
            registrationCode: new FormControl(course.secret_registration_code),
        }, {validator: CourseForm.dateValidator})
    }

    static formatCourseFormData(formData: FormGroup): CourseFormData {
        return {
            name: formData.get('name').value,
            description: formData.get('description').value,
            url: formData.get('url').value,
            start_date: this.dateToLocal(formData.get('date').value.from),
            end_date: this.dateToLocal(formData.get('date').value.to),
            registration_mode: registrationModeMapper[formData.get('registrationMode').value],
            registration_code: formData.get('registrationCode').value,
            token: '0',
            course_id: 0,
        }
    }

    static dateToLocal(date: TuiDay): Date {
        return new Date(date.toLocalNativeDate().getTime())
    }

    /**
     * Custom validator for date validity
     */
    private static dateValidator: ValidatorFn =
        (controls: AbstractControl): ValidationErrors | null => {
            const dateRange: TuiDayRange = controls.get('date').value
            return !dateRange.from || !dateRange.to ? {
                forbiddenDateRange: true
            } : null
        }
}
