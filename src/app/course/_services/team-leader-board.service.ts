import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import {ApiService} from "@app/_services/api.service";
import {Team} from "@app/_models/team";


@Injectable({
  providedIn: 'root'
})
export class TeamLeaderBoardService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ){}

  getTeams(): Observable<Team[]> {
    const url = this.apiService.getURL('team');

    return this.http
      .get<Team[]>(url)
      .pipe(
        catchError(
          this.apiService.handleError<Team[]>(`unable to load teams.`, [])
        )
      );
  }

  addTeam(team: Team): Observable<Team> {
    const url = this.apiService.getURL('team');
    console.log(team);
    return this.http
        .post<Team>(url, team)
        .pipe(catchError(this.apiService.handleError<Team>(`Error occurred while adding Team`)));
}
}
