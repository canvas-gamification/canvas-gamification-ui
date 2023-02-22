import {Component, Inject, OnInit} from '@angular/core'
import {GoalService} from "@app/course/_services/goal.service"
import {Goal, GoalStats, QuestionTypeKey} from "@app/_models/goal/goal"
import {ActivatedRoute, Router} from "@angular/router"
import {TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-goal',
    templateUrl: './goal.component.html',
    styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {
    goal: Goal
    stats: GoalStats

    constructor(
        private goalService: GoalService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService
    ) {
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params.goalId
        this.goalService.getGoal(id).subscribe(goal => {
            this.goal = goal
            if (this.canClaim()) {
                this.claim()
            }
        })
        this.goalService.getStats(id).subscribe(stats => this.stats = stats)
    }

    getGoalItem(goalItemId: number) {
        return this.goal.goal_items.find(x => x.id === goalItemId)
    }

    goalItemIds(): number[] {
        return Object.keys(this.stats).map(x => parseInt(x))
    }

    getQuestionTypeKeys(): QuestionTypeKey[] {
        return ['all', 'mcq', 'java', 'parsons']
    }

    getQuestionTypeName(typeKey: QuestionTypeKey) {
        switch (typeKey) {
            case "all":
                return "All"
            case "mcq":
                return "Multiple Choice"
            case "java":
                return "Java"
            case "parsons":
                return "Parsons"
        }
    }

    getQuestionRelativeSuccessRate(
        goalItemId: number,
        key: QuestionTypeKey
    ): number {
        return this.stats[goalItemId][key].submissions.questions_success_rate
            - this.stats[goalItemId][key].old_submissions.questions_success_rate
    }

    getPattern(goalItemId: number, type: string) {
        return this.stats[goalItemId].all.submissions.bugs.patterns.find(p => p.type === type)
    }

    getBugs(goalItemId: number) {
        return this.stats[goalItemId].all.submissions.bugs.bugs.sort((a,b) => b.count - a.count)
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
