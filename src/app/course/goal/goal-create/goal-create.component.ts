import {Component, OnInit, ViewChild} from '@angular/core'
import {FormArray, FormControl, FormGroup} from "@angular/forms"
import {GoalForm} from "@app/course/_forms/goal.form"
import {GoalService} from "@app/course/_services/goal.service"
import {ActivatedRoute, Router} from "@angular/router"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {tuiCreateTimePeriods} from "@taiga-ui/kit"
import {CategoryService} from "@app/_services/api/category.service"
import {ActionStatus, ActionType, ActionVerb, Category} from "@app/_models"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {Difficulty} from "@app/_models/difficulty"
import {Goal, GoalItem, GoalLimit} from "@app/_models/goal/goal"
import {goalItemString} from "@app/course/goal/utils"
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import {UserActionsService} from "@app/_services/api/user-actions.service"


@Component({
    selector: 'app-goal-create',
    templateUrl: './goal-create.component.html',
    styleUrls: ['./goal-create.component.scss']
})
export class GoalCreateComponent implements OnInit {

    @ViewChild('createGoalElement') createGoalElement
    timeOptions = tuiCreateTimePeriods()
    goalForm: FormGroup
    categories: Category[]
    difficulties: Difficulty[]
    courseId: number
    recommendedGoals: Goal[]
    limits: GoalLimit[]

    constructor(
        private readonly goalService: GoalService,
        private readonly categoryService: CategoryService,
        private readonly difficultyService: DifficultyService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly notificationService: TuiNotificationsService,
        private readonly userActionsService: UserActionsService,
    ) {
        dayjs.extend(relativeTime)
    }

    ngOnInit(): void {
        this.courseId = this.activatedRoute.snapshot.parent.params.courseId
        this.goalForm = GoalForm.createGoalForm()
        this.categoryService.getCategories().subscribe(
            categories => this.categories = categories
        )
        this.difficultyService.getDifficulties().subscribe(
            difficulties => this.difficulties = difficulties
        )
        this.goalService.getSuggestions().subscribe(
            goals => this.recommendedGoals = goals
        )
        this.goalService.getLimits().subscribe(
            limits => this.limits = limits
        )
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
        this.logClick("User added goal item")
    }

    removeGoalItem(index: number): void {
        this.getGoalItems().removeAt(index)
        this.logClick("User removed goal item", {index})
    }

    goalItemString(goalItem: GoalItem) {
        return goalItemString(goalItem)
    }

    setGoal(goal: Goal) {
        this.goalForm = GoalForm.createGoalFormFromGoal(goal)
        this.createGoalElement.nativeElement.scrollIntoView({
            behavior: 'smooth',
        })
        this.logClick("User used recommended goal", {goal})
    }

    createGoal(goal: Goal) {
        this.setGoal(goal)
        this.onSubmit().then()
    }

    getRelativeTime(time: string) {
        return dayjs(time).fromNow()
    }

    getNumQuestionsLimit(formControl: FormControl) {
        const category = formControl.get('category').value as number
        const difficulty = formControl.get('difficulty').value as string
        if (!category || !difficulty) {
            return 0
        }
        return this.limits.find(
            limit =>
                limit.category === category && limit.difficulty === difficulty
        ).unsolved_questions
    }

    logClick(
        description: string,
        data?: unknown
    ) {
        this.userActionsService.createCustomAction({
            description,
            object_type: ActionType.BUTTON,
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.CLICKED,
            data,
        }).subscribe()
    }

    async onSubmit(): Promise<void> {
        const goalData = GoalForm.formatGoalFormData(
            this.goalForm,
            this.courseId
        )

        const goal = await this.goalService.createGoal(goalData).toPromise()

        for (const goalItem of this.getGoalItemFormControls()) {
            const goalItemData = GoalForm.formatGoalItemFormData(
                goalItem,
                goal.id
            )
            await this.goalService.createGoalItem(goalItemData).toPromise()
        }

        this.notificationService.show('Goal created successfully', {
            label: 'Success',
            status: TuiNotification.Success
        }).subscribe()

        this.router.navigate(['..'], {relativeTo: this.activatedRoute}).then()
    }
}
