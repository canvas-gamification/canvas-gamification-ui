import {Component, Input} from '@angular/core'
import {Goal, GoalItem} from "@app/_models/goal/goal"
import {goalItemString} from "@app/course/goal/utils"

@Component({
    selector: 'app-goal-island',
    templateUrl: './goal-island.component.html',
    styleUrls: ['./goal-island.component.scss']
})
export class GoalIslandComponent {

    @Input() goal: Goal

    getGoalItemString(goalItem: GoalItem) {
        return goalItemString(goalItem)
    }
}
