import {Injectable} from '@angular/core';
import {TokenValue} from '../../../models/token_value';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenValuesService {
  private tokenValuesUrl = new URL('/api/token-values/', environment.apiBaseUrl).toString();
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  getTokenValues(): Observable<TokenValue[]> {
    return this.http
      .get<TokenValue[]>(this.tokenValuesUrl)
      .pipe(catchError(this.handleError<TokenValue[]>('getTokenValues', [])));
  }

  updateTokenValue(tokenValue: TokenValue): Observable<TokenValue>{
    return this.http.put<TokenValue>(this.tokenValuesUrl, tokenValue, this.httpOptions)
    .pipe(
    tap((newTokenValue: TokenValue) => console.log(`updated token value`)),
      catchError(this.handleError<TokenValue>('updateTokenValues', tokenValue))
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
