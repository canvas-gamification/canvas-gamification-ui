import {Injectable} from '@angular/core'
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http"
import {ApiService} from "@app/_services/api.service"
import {Team} from "@app/_models/team"
import {Observable} from "rxjs"
import {catchError} from "rxjs/operators"
import {TeamFormData} from "@app/course/_forms/team.form"

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

    getTeam(teamId: number): Observable<Team>{
        const url = this.apiService.getURL('team', teamId)
        return this.http
            .get<Team>(url)
            .pipe(catchError(this.apiService.handleError<Team>(`Error occurred while fetching the team.`)))
    }

    getMyTeam(eventId: number): Observable<Team> {
        const url = this.apiService.getURL('team', 'my-team')
        const params = new HttpParams()
            .set('event_id', String(eventId))
        return this.http
            .get<Team>(url, {params})
            .pipe(catchError(this.apiService.handleError<Team>(`Error occurred while fetching My Team.`)))
    }

    joinTeam(teamId: number): Observable<HttpResponse<unknown>> {
        const url = this.apiService.getURL('team', 'join')
        return this.http
            .post<HttpResponse<unknown>>(url, {team_id: teamId})
            .pipe(catchError(this.apiService.handleError<HttpResponse<unknown>>(`Error occurred while joining the team.`)))
    }

    createAndJoin(input: TeamFormData): Observable<Team> {
        const url = this.apiService.getURL('team', 'create-and-join')
        return this.http
            .post<Team>(url, input)
            .pipe(catchError(this.apiService.handleError<Team>(`Error occurred while adding Team.`)))
    }

    updateTeam(input: TeamFormData, teamId: number): Observable<Team> {
        const url = this.apiService.getURL('team', teamId)
        return this.http.put<Team>(url, input)
            .pipe(catchError(this.apiService.handleError<Team>(`Error occurred while updating Team.`)))
    }
}
