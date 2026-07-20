import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {ApiService} from "@app/_services/api.service"
import {Goal, GoalItem, GoalLimit, GoalStats} from "@app/_models/goal/goal"
import {catchError} from "rxjs/operators"
import {GoalFormData, GoalItemFormData} from "@app/course/_forms/goal.form"

@Injectable({
    providedIn: 'root'
})
export class GoalService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {
    }

    getGoal(id: number) {
        const url = this.apiService.getURL('goal', id)
        return this.http.get<Goal>(url).pipe(catchError(
            this.apiService.handleError<Goal>('Unable to fetch goal.')
        ))
    }

    getGoals() {
        const url = this.apiService.getURL('goal')
        return this.http.get<Goal[]>(url).pipe(catchError(
            this.apiService.handleError<Goal[]>('Unable to fetch goals.')
        ))
    }

    createGoal(input: GoalFormData) {
        const url = this.apiService.getURL('goal')
        return this.http.post<Goal>(url, input).pipe(catchError(
            this.apiService.handleError<Goal>('Unable to create goal.')
        ))
    }

    createGoalItem(input: GoalItemFormData) {
        const url = this.apiService.getURL('goal-item')
        return this.http.post<GoalItem>(url, input).pipe(catchError(
            this.apiService.handleError<GoalItem>(
                'Unable to create goal item.'
            )
        ))
    }

    getSuggestions() {
        const url = this.apiService.getURL('goal', 'suggestions')
        return this.http.get<Goal[]>(url).pipe(catchError(
            this.apiService.handleError<Goal[]>(
                'Unable to fetch goal suggestions.'
            )
        ))
    }

    claim(goalId: number) {
        const url = this.apiService.getURL('goal', goalId, 'claim')
        return this.http.post(url, {}).pipe(catchError(
            this.apiService.handleFormError()
        ))
    }

    getLimits() {
        const url = this.apiService.getURL('goal', 'limits')
        return this.http.get<GoalLimit[]>(url).pipe(catchError(
            this.apiService.handleError<GoalLimit[]>(
                'Unable to fetch goal limits.'
            )
        ))
    }

    getStats(goalId: number) {
        const url = this.apiService.getURL('goal', goalId, 'stats')
        return this.http.get<GoalStats>(url).pipe(catchError(
            this.apiService.handleError<GoalStats>(
                'Unable to fetch goal stats.'
            )
        ))
    }
}
