import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserAction} from '@app/_models';

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

  getAllUserActions(options?): Observable<UserAction[]> {
    const recent: boolean = options?.recent;
    const params = new HttpParams().set('recent', `${recent ? recent : false}`);
    const reqOptions = {
      params,
    };
    return this.http
      .get<UserAction[]>(this.userActionUrl, reqOptions)
      .pipe(
        catchError(
          this.handleError<UserAction[]>(
            `getAllUserActions`
          )
        )
      );
  }

  getUserActions(userId: any, options?): Observable<UserAction> {
    const recent: boolean = options?.recent;
    const params = new HttpParams().set('recent', `${recent ? recent : false}`);
    const reqOptions = {
      params,
    };
    // const url = `${this.userActionUrl}/${userId}`;
    const url = `${this.userActionUrl}/${2}`;
    return this.http
      .get<UserAction>(url, reqOptions)
      .pipe(
        catchError(
          this.handleError<UserAction>(
            `getUserActions`
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
