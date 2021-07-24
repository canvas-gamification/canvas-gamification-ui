import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {Team} from "@app/_models/team";
import {TeamRegistration} from "@app/_models/team_registration";
import {HttpClient, HttpParams} from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class TeamLeaderBoardService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {}

    getTeams(courseId: string): Observable < Team[] > {
        const url = this.apiService.getURL('team');
        const params = new HttpParams()
            .set('courseId', String(courseId));

        return this.http
            .get <Team[]> (url, {params})
            .pipe(
                catchError(
                    this.apiService.handleError < Team[] > (`unable to load teams.`, [])
                )
            );
    }

    getTeamRegistration(courseId: number, userId: string): Observable <TeamRegistration> {
        const url = this.apiService.getURL('team', courseId, 'get_team_registration');
        const params = new HttpParams()
            .set('userId', String(userId));
            
        return this.http
            .get <TeamRegistration>(url, {params})
            .pipe(catchError(this.apiService.handleError<TeamRegistration>(`Error occured while retrieving team registrations`)));
    }

    addTeam(courseId: number, team: Team): Observable < Team > {
        const url = this.apiService.getURL('team', courseId, 'create_team');
        console.log(team);
        return this.http
            .post <Team> (url, team)
            .pipe(catchError(this.apiService.handleError < Team > (`Error occurred while creating Team`)));
    }
    
    joinTeam(team: Team): Observable < Team > {
        const url = this.apiService.getURL('team', team.team_id, 'join_team');
        console.log(team);
        return this.http
            .post <Team> (url, team)
            .pipe(catchError(this.apiService.handleError < Team > (`Error occurred while registering for the Team`)));
    }

    leaveTeam(team: Team): Observable < Team > {
        const url = this.apiService.getURL('team', team.team_id, 'leave_team');
        console.log(team);
        return this.http
            .post <Team> (url, team)
            .pipe(catchError(this.apiService.handleError < Team > (`Error occurred while leaving this Team`)));
    }
}
