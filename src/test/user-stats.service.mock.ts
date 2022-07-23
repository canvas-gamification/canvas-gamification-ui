import {Injectable} from "@angular/core"
import {Observable, of} from "rxjs"
import {MOCK_USER_DIFFICULTY_STATS} from "@app/problems/_test/mock"
import {UserDifficultyStats} from "@app/_models/user_difficulty_stats"

@Injectable({
    providedIn: 'root',
})
export class UserStatsServiceMock {
    getUserDifficultyStats(categoryId: number): Observable<UserDifficultyStats[]> {
        return of(MOCK_USER_DIFFICULTY_STATS)
    }
}
