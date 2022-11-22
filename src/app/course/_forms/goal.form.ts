import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {TuiDay, TuiTime} from "@taiga-ui/cdk"

export interface GoalFormData {
    course_id: number
    end_date: string
}

export interface GoalItemFormData {
    goal: number
    category: number
    difficulty: string
    number_of_questions: number
}

export class GoalForm {
    static createGoalForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            end_date: new FormControl(TuiDay.currentLocal(), [Validators.required]),
            end_time: new FormControl(TuiTime.currentLocal(), [Validators.required]),
            goal_items: new FormArray([GoalForm.createGoalItemForm()], [Validators.required]),
        })
    }

    static createGoalItemForm(): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            category: new FormControl('', [Validators.required]),
            difficulty: new FormControl('', [Validators.required]),
            number_of_questions: new FormControl('', [Validators.required])
        })
    }

    static createGoalItemFormInput(category: number, difficulty: string, numberOfQuestions: number): FormGroup {
        const builder = new FormBuilder()
        return builder.group({
            category: new FormControl(category, [Validators.required]),
            difficulty: new FormControl(difficulty, [Validators.required]),
            number_of_questions: new FormControl(numberOfQuestions, [Validators.required])
        })
    }

    static formatGoalFormData(formData: FormGroup, courseId): GoalFormData {
        return {
            course_id: courseId,
            end_date: this.dateAndTimeToLocal(formData.get('end_date').value, formData.get('end_time').value)
        }
    }

    static formatGoalItemFormData(formControl: FormControl, goalId: number): GoalItemFormData {
        return {
            goal: goalId,
            ...formControl.value
        }
    }

    /**
     * Converts TuiDay and TuiTime to string
     * @param date - TuiDay object
     * @param time - TuiTime object
     */
    static dateAndTimeToLocal(date: TuiDay, time: TuiTime): string {
        const datetime = new Date(date.toLocalNativeDate().getTime() + time.toAbsoluteMilliseconds())
        return datetime.toISOString()
    }
}
