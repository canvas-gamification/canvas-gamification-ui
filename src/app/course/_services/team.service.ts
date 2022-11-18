import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from "@angular/common/http"
import {ApiService} from "@app/_services/api.service"
import {Team} from "@app/_models/team"
import {Observable} from "rxjs"

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
    }

    getMyTeam(eventId: number): Observable<Team> {
        const url = this.apiService.getURL('team')
        const params = new HttpParams()
            .set('event', String(eventId))
        return this.http
            .get<Team>(url, {params})
    }
}
