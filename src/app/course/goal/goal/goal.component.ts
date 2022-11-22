import {Component, OnInit} from '@angular/core'
import {GoalService} from "@app/course/_services/goal.service"
import {Goal} from "@app/_models/goal/goal"
import {ActivatedRoute} from "@angular/router"

@Component({
    selector: 'app-goal',
    templateUrl: './goal.component.html',
    styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {
    goal: Goal

    constructor(
        private goalService: GoalService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params.goalId
        this.goalService.getGoal(id).subscribe(goal => {
            this.goal = goal
        })
    }

    getGoalItem(goalItemId: number) {
        return this.goal.goal_items.find(x => x.id === goalItemId)
    }

    goalItemIds(): number[] {
        return Object.keys(this.goal.stats).map(x => parseInt(x))
    }

    errorMessages(goalItemId: number): { text: string, value: number }[] {
        return Object.entries(this.goal.stats[goalItemId].submissions.messages).map(([text, value]) => ({text, value}))
    }

}
