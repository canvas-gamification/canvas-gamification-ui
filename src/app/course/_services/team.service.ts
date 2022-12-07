import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from "@angular/common/http"
import {ApiService} from "@app/_services/api.service"
import {Team} from "@app/_models/team"
import {Observable} from "rxjs"
import {catchError} from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {
    }

    getChallengeTeams(eventId: number): Observable<Team[]> {
        const url = this.apiService.getURL('team')
        const params = new HttpParams()
            .set('event', String(eventId))
        return this.http
            .get<Team[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<Team[]>(`Error occurred while fetching all teams of this challenge.`)))
    }

    getMyTeam(eventId: number): Observable<Team> {
        const url = this.apiService.getURL('team', 'my-team')
        const params = new HttpParams()
            .set('event_id', String(eventId))
        return this.http
            .get<Team>(url, {params})
            .pipe(catchError(this.apiService.handleError<Team>(`Error occurred while fetching My Team.`)))
    }
}
