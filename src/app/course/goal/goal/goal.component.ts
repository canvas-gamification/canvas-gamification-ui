import {Component, OnInit} from '@angular/core'
import {GoalService} from "@app/course/_services/goal.service"
import {Goal} from "@app/_models/goal/goal"
import {ActivatedRoute} from "@angular/router"
import {TuiBaseColor} from "@taiga-ui/core"

@Component({
    selector: 'app-goal',
    templateUrl: './goal.component.html',
    styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {

    goal: Goal
    activeItemIndexes: {
        [goalItemId: number]: number
    }

    constructor(
        private goalService: GoalService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params.goalId
        this.goalService.getGoal(id).subscribe(goal => {
            this.goal = goal
            this.activeItemIndexes = {}
            Object.keys(goal.stats).forEach(goalItemId => this.activeItemIndexes[goalItemId] = NaN)
        })
    }

    values(goalItemId: number): number[] {
        return [this.goal.stats[goalItemId].correct, this.goal.stats[goalItemId].partially_correct, this.goal.stats[goalItemId].wrong]
    }

    value(goalItemId: number): number {
        if(isNaN(this.activeItemIndexes[goalItemId]))
            return this.goal.stats[goalItemId].total
        return this.values(goalItemId)[this.activeItemIndexes[goalItemId]]
    }

    color(i: number) {
        const colors = {
            0: TuiBaseColor.Success,
            1: TuiBaseColor.Primary,
            2: TuiBaseColor.Error,
        }
        return colors[i]
    }

    label(i: number) {
        if (isNaN(i)) return 'Total'
        const labels = {
            0: 'Correct',
            1: 'Partially Correct',
            2: 'Wrong',
        }
        return labels[i]
    }

    goalItemIds(): number[] {
        return Object.keys(this.goal.stats).map(x => parseInt(x))
    }

}
