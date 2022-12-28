import {Component, Inject, OnInit} from '@angular/core'
import {GoalService} from "@app/course/_services/goal.service"
import {Goal} from "@app/_models/goal/goal"
import {ActivatedRoute, Router} from "@angular/router"
import {TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-goal',
    templateUrl: './goal.component.html',
    styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {
    goal: Goal

    constructor(
        private goalService: GoalService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params.goalId
        this.goalService.getGoal(id).subscribe(goal => {
            this.goal = goal
            if(this.canClaim()) {
                this.claim()
            }
        })
    }

    getGoalItem(goalItemId: number) {
        return this.goal.goal_items.find(x => x.id === goalItemId)
    }

    goalItemIds(): number[] {
        return Object.keys(this.goal.stats).map(x => parseInt(x))
    }

    getSubmissionRelativeSuccessRate(goalItemId: number): number {
        return this.goal.stats[goalItemId].submissions.success_rate - this.goal.stats[goalItemId].old_submissions.success_rate
    }

    getQuestionRelativeSuccessRate(goalItemId: number): number {
        return this.goal.stats[goalItemId].submissions.questions_success_rate - this.goal.stats[goalItemId].old_submissions.questions_success_rate
    }

    errorMessages(goalItemId: number): { text: string, value: number }[] {
        return Object.entries(this.goal.stats[goalItemId].submissions.messages).map(([text, value]) => ({text, value}))
    }

    canClaim() {
        return !this.goal.claimed && this.goal.progress >= this.goal.number_of_questions
    }

    claim() {
        this.goalService.claim(this.goal.id).subscribe(() => {
            this.goalService.getGoal(this.goal.id).subscribe(goal => this.goal = goal)
        })
    }

}
