import {Component, OnInit} from '@angular/core'
import {GoalService} from "@app/course/_services/goal.service"
import {Goal} from "@app/_models/goal/goal"

@Component({
    selector: 'app-goal-page',
    templateUrl: './goal-page.component.html',
    styleUrls: ['./goal-page.component.scss']
})
export class GoalPageComponent implements OnInit {

    goals: Goal[]

    constructor(private readonly goalService: GoalService) {
    }

    ngOnInit(): void {
        this.goalService.getGoals().subscribe(goals => {
            this.goals = goals
        })
    }
}
