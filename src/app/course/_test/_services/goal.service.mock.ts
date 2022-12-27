import {Injectable} from "@angular/core"
import {of} from "rxjs"
import {MOCK_GOAL_LIMITS, MOCK_GOALS} from "@app/course/_test/mock"

@Injectable({
    providedIn: 'root',
})
export class GoalServiceMock {
    getGoal(id: number) {
        return of(MOCK_GOALS.find(goal => goal.id === id))
    }

    getGoals() {
        return of(MOCK_GOALS)
    }

    getSuggestions() {
        return of(MOCK_GOALS)
    }

    getLimits() {
        return of(MOCK_GOAL_LIMITS)
    }
}
