import {Component, Inject, Input, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {GoalService} from "@app/course/_services/goal-service.service"
import {Category, Course, CourseRegistration} from "@app/_models"
import {TuiDay, TuiTime} from '@taiga-ui/cdk'
import {CategoryService} from "@app/_services/api/category.service"
import {Observable, Subscription} from "rxjs"
import {Difficulty} from "@app/_models/difficulty"
import {GoalTaskForm} from "@app/course/_forms/goal-task-form"
import {GoalTask} from "@app/_models/goalTask"
import {tuiCreateTimePeriods} from '@taiga-ui/kit'
import {DatePipe, Time} from "@angular/common"
import {GoalForm, GoalFormData} from "@app/course/_forms/goal.form"

@Component({
    selector: 'app-goal-creation-page',
    templateUrl: './goal-creation-page.component.html',
    styleUrls: ['./goal-creation-page.component.scss']
})
export class GoalCreationPageComponent implements OnInit {

    constructor(
        private builder: FormBuilder,
        private goalService: GoalService,
        private categoryService: CategoryService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
    }

    isLoaded = false
    goalForm: FormGroup
    today: Date = new Date()
    @Input() currCourse: Course
    tasks: GoalTaskForm[] = [new GoalTaskForm()]
    timeOptions = tuiCreateTimePeriods()

    difficulties: string[] = [
        "Easy",
        "Medium",
        "Hard"
    ]

    categories: Category[] = []
    categoryCall: Subscription = this.categoryService.getCategories().subscribe(data => {
        this.categories = data
        this.isLoaded = true
        this.generateSuggestedTasks(5)
    })

    suggestedTasks: GoalTask[] = []

    addTask(): void {
        this.tasks.push(new GoalTaskForm())
        this.tasks[this.tasks.length - 1].createBlankForm()
    }

    deleteTask(index: number) {
        this.tasks.splice(index, 1)
    }

    ngOnInit(): void {
        this.goalForm = GoalForm.createGoalForm()
    }

    onSubmit(): void {
        const goalDataSub = GoalForm.formatGoalFormData(this.goalForm, this.currCourse.id)
        this.goalService.postGoal(goalDataSub)
            .subscribe(() => {
                this.goalForm.reset()
                this.notificationsService
                    .show('Your goal has been created! Good luck!', {
                        status: TuiNotification.Success
                    }).subscribe()
            })
    }

    generateSuggestedTasks(num: number): void {
        for (let i = 0; i < num; i++) {
            const suggestedGoal = null
            const suggestedCategory = this.categories[Math.round(Math.random() * (this.categories.length - 1))]
            const suggestedDifficulty = this.difficulties[Math.round(Math.random() * (this.difficulties.length - 1))]
            const suggestedNum = Math.round(Math.random() * 5) * 5
            const newTask = new GoalTask(suggestedGoal, suggestedCategory, suggestedDifficulty, suggestedNum)
            this.suggestedTasks.push(newTask)
        }
    }
}
