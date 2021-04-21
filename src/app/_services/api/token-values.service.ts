import {Injectable} from '@angular/core';
import {NestedTokenValue, TokenValue} from '@app/_models';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TokenValuesService {
    private tokenValuesUrl = new URL('/api/token-values/', environment.apiBaseUrl).toString();

    constructor(
        private http: HttpClient,
    ) {
    }

    getTokenValues(): Observable<TokenValue[]> {
        return this.http
            .get<TokenValue[]>(this.tokenValuesUrl)
            .pipe(catchError(this.handleError<TokenValue[]>('getTokenValues', [])));
    }

    getNestedTokenValues(): Observable<NestedTokenValue[]> {
        return this.http.get<NestedTokenValue[]>(`${this.tokenValuesUrl}nested/`)
            .pipe(catchError(this.handleError<NestedTokenValue[]>('getNestedTokenValues', [])));
    }

    updateTokenValue(tokenValue: TokenValue): Observable<TokenValue> {
        return this.http.put<TokenValue>(this.tokenValuesUrl + tokenValue.pk + '/', tokenValue).pipe(
            catchError(this.handleError<TokenValue>('updateTokenValue', tokenValue))
        );
    }

    updateBulk(data: { id: number, value: number }[]): Observable<any> {
        return this.http.patch<any>(`${this.tokenValuesUrl}update-bulk/`, {data})
            .pipe(catchError(this.handleError<any>('updateBulk')));
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
