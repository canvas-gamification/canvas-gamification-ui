import {Injectable} from '@angular/core';
import {UserStats} from '../../_models/user_stats';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserStatsService {
  private userStatsUrl = new URL(
    '/api/user-stats',
    environment.apiBaseUrl
  ).toString();

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getUserStats(): Observable<UserStats> {
    const url = `${this.userStatsUrl}/1`;
    return this.http
      .get<UserStats>(url)
      .pipe(
        catchError(
          this.handleError<UserStats>(
            `getUserStat`
          )
        )
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
