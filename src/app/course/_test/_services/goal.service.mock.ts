import {Injectable} from "@angular/core"
import {of} from "rxjs"
import {MOCK_GOALS} from "@app/course/_test/mock"

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

    getGoalSuggestions() {
        return of(MOCK_GOALS)
    }
}
