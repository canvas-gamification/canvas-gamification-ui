import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import {ApiService} from "@app/_services/api.service"
import {Stats, UserStats} from "@app/_models/user_difficulty_stats"


@Injectable({
    providedIn: 'root',
})
export class UserStatsService {
    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    /**
     * Gets the user stats by difficulty for a category.
     * @param categoryId - The category to get the stats for.
     */
    getUserStatsByCategory(categoryId: number): Observable<UserStats[]> {
        const url = this.apiService.getURL('user-stats', 'category', categoryId)
        return this.http
            .get<UserStats[]>(url)
            .pipe(catchError(this.apiService.handleError<UserStats[]>(`Error occurred while getting user stats`)))
    }

    getUserStats(): Observable<Stats> {
        const url = this.apiService.getURL('user-stats')
        return this.http
            .get<Stats>(url)
            .pipe(catchError(this.apiService.handleError<Stats>(`Error occurred while getting user stats`)))
    }
}
