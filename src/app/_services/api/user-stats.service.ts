import {Injectable} from '@angular/core';
import {UserStats} from '@app/_models';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root',
})
export class UserStatsService {
    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getUserStat(userStatId: number): Observable<UserStats> {
        const url = this.apiService.getURL('user-stats', userStatId);
        return this.http
            .get<UserStats>(url)
            .pipe(catchError(this.apiService.handleError<UserStats>(`Error occurred while getting user stats`)));
    }
}
