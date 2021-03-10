import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Course, Message} from '@app/_models';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenUseService {
  private tokenUseUrl = new URL(
    '/api/use-tokens',
    environment.apiBaseUrl
  ).toString();

  constructor(private http: HttpClient) {
  }

  useTokens(tokenActions, courseId: number): Observable<Message> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.tokenUseUrl}/${courseId}`;
    return this.http.post<Message>(url, tokenActions, {headers})
      .pipe(
        catchError(
          this.handleError<Message>(
            `getCourses`
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
