import {Component, OnInit} from '@angular/core'
import {FormArray, FormControl, FormGroup} from "@angular/forms"
import {GoalForm} from "@app/course/_forms/goal.form"
import {GoalService} from "@app/course/_services/goal.service"
import {Router} from "@angular/router"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {tuiCreateTimePeriods} from "@taiga-ui/kit"
import {CategoryService} from "@app/_services/api/category.service"
import {Category} from "@app/_models"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {Difficulty} from "@app/_models/difficulty"

@Component({
    selector: 'app-goal-create',
    templateUrl: './goal-create.component.html',
    styleUrls: ['./goal-create.component.scss']
})
export class GoalCreateComponent implements OnInit {

    timeOptions = tuiCreateTimePeriods()
    goalForm: FormGroup
    categories: Category[]
    difficulties: Difficulty[]

    constructor(
        private readonly goalService: GoalService,
        private readonly categoryService: CategoryService,
        private readonly difficultyService: DifficultyService,
        private readonly router: Router,
        private readonly notificationService: TuiNotificationsService
    ) {
    }

    ngOnInit(): void {
        this.goalForm = GoalForm.createGoalForm()
        this.categoryService.getCategories().subscribe(categories => this.categories = categories)
        this.difficultyService.getDifficulties().subscribe(difficulties => this.difficulties = difficulties)
    }

    getGoalItems(): FormArray {
        return this.goalForm.get('goal_items') as FormArray
    }

    getFormControl(fc: FormControl, field: string): FormControl {
        return fc.get(field) as FormControl
    }

    getGoalItemFormControls(): FormControl[] {
        return this.getGoalItems().controls as FormControl[]
    }

    addGoalItem(): void {
        this.getGoalItems().push(GoalForm.createGoalItemForm())
    }

    removeGoalItem(index: number): void {
        this.getGoalItems().removeAt(index)
    }

    onSubmit(): void {
        const goalData = GoalForm.formatGoalFormData(this.goalForm)
        console.debug(goalData)

        this.goalService.createGoal(goalData).subscribe({
            next: () => {
                // this.router.navigate(['..'])
                this.notificationService.show('Goal created successfully', {
                    label: 'Success',
                    status: TuiNotification.Success
                })
            }
        })
    }
}
