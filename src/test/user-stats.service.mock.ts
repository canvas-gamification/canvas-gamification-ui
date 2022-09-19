import {Injectable} from "@angular/core"
import {Observable, of} from "rxjs"
import {MOCK_USER_DIFFICULTY_STATS} from "@app/problems/_test/mock"
import {UserStats} from "@app/_models/user_difficulty_stats"

@Injectable({
    providedIn: 'root',
})
export class UserStatsServiceMock {
    getUserStatsByCategory(categoryId: number): Observable<UserStats[]> {
        return of(MOCK_USER_DIFFICULTY_STATS)
    }
}
