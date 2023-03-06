import {Injectable} from '@angular/core'
import {HttpResponse} from "@angular/common/http"
import {Team} from "@app/_models/team"
import {Observable, of} from "rxjs"
import {TeamFormData} from "@app/course/_forms/team.form"

@Injectable({
    providedIn: 'root'
})
export class TeamServiceMock {

    getChallengeTeams(eventId: number): Observable<Team[]> {
        return of()
    }

    getTeam(teamId: number): Observable<Team>{
        return of()
    }

    getMyTeam(eventId: number): Observable<Team> {
        return of()
    }

    joinTeam(teamId: number): Observable<HttpResponse<unknown>> {
        return of()
    }

    createAndJoin(input: TeamFormData): Observable<Team> {
        return of()
    }

    updateTeam(input: TeamFormData, teamId: number): Observable<Team> {
        return of()
    }
}
