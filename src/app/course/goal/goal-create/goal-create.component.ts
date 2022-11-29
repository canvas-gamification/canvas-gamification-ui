import {Component, OnInit} from '@angular/core'
import {FormArray, FormControl, FormGroup} from "@angular/forms"
import {GoalForm} from "@app/course/_forms/goal.form"
import {GoalService} from "@app/course/_services/goal.service"
import {ActivatedRoute, Router} from "@angular/router"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {tuiCreateTimePeriods} from "@taiga-ui/kit"
import {CategoryService} from "@app/_services/api/category.service"
import {Category, Question} from "@app/_models"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {Difficulty} from "@app/_models/difficulty"
import {Goal, GoalItem} from "@app/_models/goal/goal"
import {QuestionService} from "@app/problems/_services/question.service"

@Component({
    selector: 'app-goal-create',
    templateUrl: './goal-create.component.html',
    styleUrls: ['./goal-create.component.scss']
})
export class GoalCreateComponent implements OnInit {
    constructor(
        private readonly goalService: GoalService,
        private readonly questionService: QuestionService,
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
    questions: Question[]
    courseId: number
    errorMessages: string[]

    suggestedGoals: Goal[]
    suggestedGoalsStr: [string[]] = [[]]

    ngOnInit(): void {
        this.errorMessages = []

        this.courseId = this.activatedRoute.snapshot.params.courseId
        this.goalForm = GoalForm.createGoalForm()
        this.categoryService.getCategories().subscribe(data => {
            this.categories = data
        })

        this.questionService.getQuestions().subscribe(paginatedQuestions => {
            this.questions = paginatedQuestions.results
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
        this.checkInputValidity()
    }

    addGoalItemInput(inCategory: number, inDifficulty: string, inNum: number): void {
        this.getGoalItems().push(GoalForm.createGoalItemFormInput(inCategory, inDifficulty, inNum))
    }

    removeGoalItem(index: number): void {
        this.getGoalItems().removeAt(index)
        this.checkInputValidity()
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
        let str = ""
        let pluralVar = "questions"
        const categoryName = this.getCategory(goalItem.category)
        if (goalItem.number_of_questions == 1) pluralVar = "question"
        str += "Solve " + goalItem.number_of_questions + " "
            + goalItem.difficulty.toString().toLowerCase() + " " + pluralVar + " from " + categoryName
        return str
    }

    getCategory(id: number): Category {
        let categoryToReturn = null
        if (this.categories == null || this.categories == []) {
            return null
        } else {
            for (const category of this.categories) {
                if (category.pk == id) {
                    categoryToReturn = category
                }
            }
            return categoryToReturn
        }
    }

    async onSubmit(): Promise<void> {

        const canCreateGoal = this.checkInputValidity()

        if (canCreateGoal) {
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
    }

    getNumberOfQuestions(category: number, difficulty: string): number {
        let total = 0
        for (let i = 0; i < this.questions.length; i++) {
            const question = this.questions[i]
            if (question.category == category && question.difficulty.toLowerCase() === difficulty.toLowerCase()) {
                total++
            }
        }

        return total
    }

    checkInputValidity(): boolean {
        let canCreateGoal = true
        this.errorMessages = []
        for (const goalItem of this.getGoalItemFormControls()) {
            if (goalItem.valid) {

                const goalItemData = GoalForm.formatMockGoalItemFormData(goalItem)
                const categoryName = this.getCategory(goalItemData.category).full_name
                const numberOfQuestions = this.getNumberOfQuestions(goalItemData.category, goalItemData.difficulty)
                if (numberOfQuestions < goalItemData.number_of_questions) {
                    canCreateGoal = false
                }
                if (!canCreateGoal) {
                    let msg = ""
                    if (numberOfQuestions == 0) {
                        msg = 'The database does not contain any ' +
                            goalItemData.difficulty.toLowerCase() +
                            ' questions for ' + categoryName +
                            '. Please choose another category or difficulty.'
                    } else {
                        msg = 'The database does not contain ' +
                            goalItemData.number_of_questions + ' ' +
                            goalItemData.difficulty.toLowerCase() +
                            ' questions in ' + categoryName +
                            '. Please choose a number less than ' +
                            (numberOfQuestions + 1) + '.'
                    }
                    this.errorMessages.push(msg)
                }
            } else {
                canCreateGoal = false
            }
        }

        return canCreateGoal
    }
}
