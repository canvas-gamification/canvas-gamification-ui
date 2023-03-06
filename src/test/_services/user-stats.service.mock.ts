import {Injectable} from "@angular/core"
import {Observable, of} from "rxjs"
import {MOCK_USER_DIFFICULTY_STATS} from "@app/problems/_test/mock"
import {Stats, UserStats} from "@app/_models/user_difficulty_stats"
import {MOCK_USER_STATS1} from "@app/course/_test/mock"

@Injectable({
    providedIn: 'root',
})
export class UserStatsServiceMock {
    getUserStatsByCategory(categoryId: number): Observable<UserStats[]> {
        return of(MOCK_USER_DIFFICULTY_STATS)
    }

    getUserStats(): Observable<Stats> {
        return of(MOCK_USER_STATS1)
    }
}
