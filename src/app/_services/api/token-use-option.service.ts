import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TokenUseOption} from '@app/_models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenUseOptionService {
  private tokenUseOptionsUrl = new URL(
    '/api/token-use-options',
    environment.apiBaseUrl
  ).toString();

  constructor(private http: HttpClient) {
  }

  getTokenUseOptions(options?): Observable<TokenUseOption[]> {
    const params = new HttpParams();

    return this.http
      .get<TokenUseOption[]>(this.tokenUseOptionsUrl, {params})
      .pipe(
        catchError(
          this.handleError<TokenUseOption[]>(
            `getTokenUseOptions`
          )
        )
      );
  }

  getTokenUseOption(tokenUseOptionId: number, options?): Observable<TokenUseOption> {
    const params = new HttpParams();

    const url = `${this.tokenUseOptionsUrl}/${tokenUseOptionId}`;
    return this.http
      .get<TokenUseOption>(url, {params})
      .pipe(
        catchError(
          this.handleError<TokenUseOption>(
            `getUserTokenUseOption`
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
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
