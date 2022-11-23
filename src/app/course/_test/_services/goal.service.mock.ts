import {Injectable} from "@angular/core"
import {Observable, of} from "rxjs"
import {Goal, GoalItem} from "@app/_models/goal/goal"
import {MOCK_CATEGORIES, MOCK_GOALS} from "@app/problems/_test/mock"
import {HttpClient} from "@angular/common/http"
import {ApiService} from "@app/_services/api.service"
import {catchError} from "rxjs/operators"
import {GoalFormData, GoalItemFormData} from "@app/course/_forms/goal.form"

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
