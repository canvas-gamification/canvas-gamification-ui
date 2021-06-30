import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import{
  LeaderBoard,
  Course,
  RegistrationStatus
} from '@app/_models';


import { HttpClient , HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
//import { TestModel } from '@app/_models/test_model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private testUrl = new URL('/api/apitest/', environment.apiBaseUrl).toString();

  constructor(
    private http: HttpClient,
    private apiService: ApiService) {

  }

  getLeaderBoard(leaderBoardId:number): Observable<LeaderBoard> {
    const url = this.apiService.getURL('leader_board', leaderBoardId);
    return this.http
      .get<LeaderBoard>(url)
      .pipe(catchError(this.apiService.handleError<LeaderBoard>(`Unable to load leader board`, null)));
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
}
