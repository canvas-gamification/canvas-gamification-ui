import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Action} from '@app/_models';
import {PaginatedResult} from '@app/_models/paginatedResult';

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

  getUserActions(options?): Observable<PaginatedResult<Action>> {
    const {page = 1, page_size = 100} = options ? options : {};
    let params = new HttpParams()
      .set('page', page)
      .set('page_size', page_size);

    if (options?.recent ?? false) {
      params = params.set('ordering', '-time_modified');
    }

    return this.http
      .get<PaginatedResult<Action>>(this.userActionUrl, {params})
      .pipe(
        catchError(
          this.handleError<PaginatedResult<Action>>(
            `getAllUserActions`
          )
        )
      );
  }

  getUserAction(actionId: any): Observable<Action> {
    const params = new HttpParams();

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
