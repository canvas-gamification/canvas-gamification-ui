import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {TestModel} from '@app/_models/test_model';

@Injectable({
    providedIn: 'root'
  })
  export class LeaderboardService {
    private testUrl = new URL('/api/apitest/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) { }

    getCategories(): Observable<TestModel[]> {
      return this.http
          .get<TestModel[]>(this.testUrl)
          .pipe(catchError(this.handleError<TestModel[]>('getTest', [])));
  }
      /**
       * Handle Http operation that failed.
       * Let the app continue.
       * @param operation - name of the operation that failed
       * @param result - optional value to return as the observable result
       */
      private handleError<T>(operation?, result?: T) {
        return (error: string): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
