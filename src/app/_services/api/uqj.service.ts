import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserUQJ} from '@app/_models/user_uqj';

@Injectable({
  providedIn: 'root'
})
export class UqjService {
  private uqjUrl = new URL(
    '/api/uqj',
    environment.apiBaseUrl
  ).toString();

  constructor(private http: HttpClient) { }

  getAllUserUQJs(options?): Observable<UserUQJ[]> {
    const recent: boolean = options?.recent;
    const params = new HttpParams().set('recent', `${recent ? recent : false}`);
    const reqOptions = {
      params,
    };
    return this.http
      .get<UserUQJ[]>(this.uqjUrl, reqOptions)
      .pipe(
        catchError(
          this.handleError<UserUQJ[]>(
            `getAllUserUQJs`
          )
        )
      );
  }

  getUserUQJs(userId: any, options?): Observable<UserUQJ> {
    const recent: boolean = options?.recent;
    const params = new HttpParams().set('recent', `${recent ? recent : false}`);
    const reqOptions = {
      params,
    };
    // TODO: const url = `${this.userActionUrl}/${userId}`;
    const url = `${this.uqjUrl}/${2}`;
    return this.http
      .get<UserUQJ>(url, reqOptions)
      .pipe(
        catchError(
          this.handleError<UserUQJ>(
            `getUserUQJs`
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
