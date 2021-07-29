// Angular Imports
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
// Services Imports
import {ApiService} from "@app/_services/api.service";
import {Team} from "@app/_models/team";
import {TeamRegistration} from "@app/_models/team_registration";

@Injectable({
    providedIn: 'root'
})
export class TeamLeaderBoardService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {}

    /**
     * Makes call to 'team' API endpoint to retrieve all teams in the specified course
     * @param courseId - teams belonging to this course will be returned
     */
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

    /**
     * Makes call to 'team' API endpoint to retrieve teamRegistration object for a (course, user) pair
     * @param courseId the course's Id
     * @param userId - the user's Id
     */
    getTeamRegistration(courseId: number, userId: string): Observable <TeamRegistration> {
        const url = this.apiService.getURL('team', courseId, 'get_team_registration');
        const params = new HttpParams()
            .set('userId', String(userId));

        return this.http
            .get <TeamRegistration>(url, {params})
            .pipe(catchError(this.apiService.handleError<TeamRegistration>(`Error occurred while retrieving team registrations`)));
    }

    /**
     * Makes call to 'team' API endpoint to create a new team
     * @param courseId - Course which the team will belong to
     * @param team - The data to be passed to the API, a Team Object
     */
    addTeam(courseId: number, team: Team): Observable < Team > {
        const url = this.apiService.getURL('team', courseId, 'create_team');
        return this.http
            .post <Team> (url, team)
            .pipe(catchError(this.apiService.handleError < Team > (`Error occurred while creating Team`)));
    }

    /**
     * Makes call to 'team' API endpoint to add user to this team
     * @param team - data to be sent to API, a Team Object
     */
    joinTeam(team: Team): Observable < Team > {
        const url = this.apiService.getURL('team', team.team_id, 'join_team');
        return this.http
            .post <Team> (url, team)
            .pipe(catchError(this.apiService.handleError < Team > (`Error occurred while registering for the Team`)));
    }

    /**
     * Makes call to 'team' API endpoint to remove the user from this team
     * @param team - data to be sent to API, a Team Object
     */
    leaveTeam(team: Team): Observable < Team > {
        const url = this.apiService.getURL('team', team.team_id, 'leave_team');
        return this.http
            .post <Team> (url, team)
            .pipe(catchError(this.apiService.handleError < Team > (`Error occurred while leaving this Team`)));
    }
}
