import {Component, Input} from '@angular/core'
import {Goal, GoalItem} from "@app/_models/goal/goal"
import {goalItemString} from "@app/course/goal/utils"
import * as dayjs from "dayjs"
import * as relativeTime from "dayjs/plugin/relativeTime"

@Component({
    selector: 'app-goal-island',
    templateUrl: './goal-island.component.html',
    styleUrls: ['./goal-island.component.scss']
})
export class GoalIslandComponent {

    @Input() goal: Goal

    constructor() {
        dayjs.extend(relativeTime)
    }

    getGoalItemString(goalItem: GoalItem) {
        return goalItemString(goalItem)
    }

    getRelativeTime(time: string) {
        return dayjs(time).fromNow(true)
    }
}
