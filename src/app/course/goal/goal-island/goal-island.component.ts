import {Component, Input} from '@angular/core'
import {Goal, GoalItem} from "@app/_models/goal/goal"
import {goalItemString} from "@app/course/goal/utils"
import * as dayjs from "dayjs"
import * as relativeTime from "dayjs/plugin/relativeTime"
import {ActivatedRoute} from '@angular/router'

@Component({
    selector: 'app-goal-island',
    templateUrl: './goal-island.component.html',
    styleUrls: ['./goal-island.component.scss']
})
export class GoalIslandComponent {

    @Input() goal: Goal
    @Input() showPerformanceButton?: boolean = true
    courseId: string

    constructor(private readonly route: ActivatedRoute) {
        dayjs.extend(relativeTime)
        this.courseId = this.route.parent.snapshot.params.courseId
    }

    canClaim() {
        return !this.goal.claimed && this.goal.progress >= this.goal.number_of_questions
    }

    getGoalItemString(goalItem: GoalItem) {
        return goalItemString(goalItem)
    }

    getRelativeTime(time: string) {
        return dayjs(time).fromNow(true)
    }
}
