import {UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import {TuiDay, TuiTime} from "@taiga-ui/cdk"
import {Goal, GoalItem} from "@app/_models/goal/goal"

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
    static createGoalForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            end_date: new UntypedFormControl(TuiDay.currentLocal().append({day: 7}), [Validators.required]),
            end_time: new UntypedFormControl(TuiTime.currentLocal(), [Validators.required]),
            goal_items: new UntypedFormArray([GoalForm.createGoalItemForm()], [Validators.required]),
        })
    }

    static createGoalFormFromGoal(goal: Goal): UntypedFormGroup {
        const endDate = new Date(goal.end_date)
        const builder = new UntypedFormBuilder()
        return builder.group({
            end_date: new UntypedFormControl(TuiDay.fromLocalNativeDate(endDate), [Validators.required]),
            end_time: new UntypedFormControl(TuiTime.fromLocalNativeDate(endDate), [Validators.required]),
            goal_items: new UntypedFormArray(goal.goal_items.map(GoalForm.createGoalItemFormFromGoalItem), [Validators.required]),
        })
    }

    static createGoalItemForm(): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            category: new UntypedFormControl('', [Validators.required]),
            difficulty: new UntypedFormControl('', [Validators.required]),
            number_of_questions: new UntypedFormControl('', [Validators.required])
        })
    }

    static createGoalItemFormFromGoalItem(goalItem: GoalItem): UntypedFormGroup {
        const builder = new UntypedFormBuilder()
        return builder.group({
            category: new UntypedFormControl(goalItem.category, [Validators.required]),
            difficulty: new UntypedFormControl(goalItem.difficulty, [Validators.required]),
            number_of_questions: new UntypedFormControl(goalItem.number_of_questions, [Validators.required])
        })
    }

    static formatGoalFormData(formData: UntypedFormGroup, courseId): GoalFormData {
        return {
            course_id: courseId,
            end_date: this.dateAndTimeToLocal(formData.get('end_date').value, formData.get('end_time').value)
        }
    }

    static formatGoalItemFormData(formControl: UntypedFormControl, goalId: number): GoalItemFormData {
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
