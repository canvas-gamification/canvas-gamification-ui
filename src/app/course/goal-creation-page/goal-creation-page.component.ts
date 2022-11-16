import {Component, OnInit} from '@angular/core'
import {FormArray, FormControl, FormGroup} from "@angular/forms"
import {GoalForm} from "@app/course/_forms/goal.form"
import {GoalService} from "@app/course/_services/goal.service"
import {ActivatedRoute, Router} from "@angular/router"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {tuiCreateTimePeriods} from "@taiga-ui/kit"
import {CategoryService} from "@app/_services/api/category.service"
import {Category} from "@app/_models"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {Difficulty} from "@app/_models/difficulty"
import {Goal, GoalItem} from "@app/_models/goal/goal"

@Component({
    selector: 'app-goal-creation-page',
    templateUrl: './goal-creation-page.component.html',
    styleUrls: ['./goal-creation-page.component.scss']
})
export class GoalCreationPageComponent implements OnInit {
    constructor(
        private readonly goalService: GoalService,
        private readonly categoryService: CategoryService,
        private readonly difficultyService: DifficultyService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly notificationService: TuiNotificationsService
    ) {
    }

    timeOptions = tuiCreateTimePeriods()
    goalForm: FormGroup
    categories: Category[]
    difficulties: Difficulty[]
    courseId: number

    public isLoaded = false
    suggestedGoals: Goal[]
    suggestedGoalsStr: [string[]] = [[]]

    ngOnInit(): void {
        this.courseId = this.activatedRoute.snapshot.params.courseId
        this.goalForm = GoalForm.createGoalForm()
        this.categoryService.getCategories().subscribe(data => {
            this.categories = data

            this.goalService.getGoalSuggestions().subscribe(data => {
                this.isLoaded = true
                this.suggestedGoals = data
                this.suggestedGoalsStr.splice(0)
                for (const goal of this.suggestedGoals) {
                    // this.suggestedGoalsStr.push(this.getCategory(goal.category).full_name)
                    const arrayOfStrings: string[] = []
                    for (const item of goal.goal_items) {
                        arrayOfStrings.push(this.goalItemToString(item))
                    }
                    this.suggestedGoalsStr.push(arrayOfStrings)
                }
            })
        })
        this.difficultyService.getDifficulties().subscribe(difficulties => this.difficulties = difficulties)
    }


    getGoalItems(): FormArray {
        return this.goalForm.get('goal_items') as FormArray
    }

    getFormControl(fc: FormControl, field: string): FormControl {
        return fc.get(field) as FormControl
    }

    getGoalItemFormGroup(): FormGroup[] {
        return this.getGoalItems().controls as FormGroup[]
    }

    getGoalItemFormControls(): FormControl[] {
        return this.getGoalItems().controls as FormControl[]
    }

    addGoalItem(): void {
        this.getGoalItems().push(GoalForm.createGoalItemForm())
    }

    addGoalItemInput(inCategory: number, inDifficulty: string, inNum: number): void {
        this.getGoalItems().push(GoalForm.createGoalItemFormInput(inCategory, inDifficulty, inNum))
    }

    removeGoalItem(index: number): void {
        this.getGoalItems().removeAt(index)
    }

    goalToString(goal: Goal): string {
        let str = "No goal items to display"
        const itemsArray = this.suggestedGoalsStr[this.getGoalIndex(goal)]
        if (itemsArray.length > 0) {
            str = ""
            for (const itemString of itemsArray) {
                str += itemString
            }
        }
        return str
    }

    getGoalIndex(goal: Goal): number {
        for (let i = 0; i < this.suggestedGoals.length; i++) {
            const sugGoal = this.suggestedGoals[i]
            if (goal.id == sugGoal.id) {
                return i
            }
        }
        return null
    }

    goalItemToString(goalItem: GoalItem): string {
        let str = "papa"
        let pluralVar = "questions"
        const categoryName = this.getCategory(goalItem.category)
        if (goalItem.number_of_questions == 1) pluralVar = "question"
        str += "Solve " + goalItem.number_of_questions + " "
            + goalItem.difficulty.toString().toLowerCase() + " " + pluralVar + " from " + categoryName
        return str
    }

    getCategory(id: number): Category {
        if (this.categories == null || this.categories == []) {
            return null
        } else {
            for (const category of this.categories) {
                if (category.pk == id) {
                    return category
                } else {
                    return null
                }
            }
        }
    }

    async onSubmit(): Promise<void> {
        const goalData = GoalForm.formatGoalFormData(this.goalForm, this.courseId)

        const goal = await this.goalService.createGoal(goalData).toPromise()

        for (const goalItem of this.getGoalItemFormControls()) {
            const goalItemData = GoalForm.formatGoalItemFormData(goalItem, goal.id)
            await this.goalService.createGoalItem(goalItemData).toPromise()
        }

        this.notificationService.show('Goal created successfully', {
            label: 'Success',
            status: TuiNotification.Success
        }).subscribe()

        this.router.navigate(['..'], {relativeTo: this.activatedRoute}).then()
    }

    // generateSuggestedTasks(num: number): void {
    //     for (let i = 0; i < num; i++) {
    //         const suggestedGoal = null
    //         const suggestedCategory = this.categories[Math.round(Math.random() * (this.categories.length - 1))]
    //         const suggestedDifficulty = this.difficulties[Math.round(Math.random() * (this.difficulties.length - 1))][0]
    //         const suggestedNum = (Math.round(Math.random() * 5) * 5) + 5
    //         const newTask = new GoalTask(suggestedGoal, suggestedCategory, suggestedDifficulty, suggestedNum)
    //         this.suggestedTasks.push(newTask)
    //     }
    // }
}
