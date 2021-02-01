import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UQJ} from '@app/_models/uqj';

@Injectable({
  providedIn: 'root'
})
export class UqjService {
  private userUqjUrl = new URL(
    '/api/uqj',
    environment.apiBaseUrl
  ).toString();

  constructor(private http: HttpClient) { }

  getUQJs(options?): Observable<UQJ[]> {
    const recent: boolean = options?.recent;
    const params = new HttpParams().set('recent', `${recent ? recent : false}`);

    return this.http
      .get<UQJ[]>(this.userUqjUrl, {params})
      .pipe(
        catchError(
          this.handleError<UQJ[]>(
            `getAllUserUQJ`
          )
        )
      );
  }

  getUQJ(uqjId: any, options?): Observable<UQJ> {
    const recent: boolean = options?.recent;
    const params = new HttpParams().set('recent', `${recent ? recent : false}`);

    const url = `${this.userUqjUrl}/${uqjId}`;
    return this.http
      .get<UQJ>(url, {params})
      .pipe(
        catchError(
          this.handleError<UQJ>(
            `getUserUQJ`
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
