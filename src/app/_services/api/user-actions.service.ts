import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Action} from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class UserActionsService {
  private userActionUrl = new URL(
    '/api/user-actions',
    environment.apiBaseUrl
  ).toString();

  constructor(private http: HttpClient) {
  }

  getUserActions(options?): Observable<Action[]> {
    const recent: boolean = options?.recent;
    const params = new HttpParams().set('recent', `${recent ? recent : false}`);

    return this.http
      .get<Action[]>(this.userActionUrl, {params})
      .pipe(
        catchError(
          this.handleError<Action[]>(
            `getAllUserActions`
          )
        )
      );
  }

  getUserAction(actionId: any, options?): Observable<Action> {
    const recent: boolean = options?.recent;
    const params = new HttpParams().set('recent', `${recent ? recent : false}`);

    const url = `${this.userActionUrl}/${actionId}`;
    return this.http
      .get<Action>(url, {params})
      .pipe(
        catchError(
          this.handleError<Action>(
            `getUserAction`
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
