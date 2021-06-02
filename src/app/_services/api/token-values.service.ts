import {Injectable} from '@angular/core';
import {NestedTokenValue, TokenValue} from '@app/_models';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root',
})
export class TokenValuesService {

    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {
    }

    getTokenValues(): Observable<TokenValue[]> {
        const url = this.apiService.getURL('token-values');
        return this.http
            .get<TokenValue[]>(url)
            .pipe(catchError(this.apiService.handleError<TokenValue[]>('Error occurred while fetching token values',[])));
    }

    getNestedTokenValues(): Observable<NestedTokenValue[]> {
        const url = this.apiService.getURL('token-values', 'nested');
        return this.http.get<NestedTokenValue[]>(url)
            .pipe(catchError(this.apiService.handleError<NestedTokenValue[]>('Error occurred while fetching nested token values',[])));
    }

    updateTokenValue(tokenValue: TokenValue): Observable<TokenValue> {
        const url = this.apiService.getURL('token-values', tokenValue.pk);
        return this.http.put<TokenValue>(url, tokenValue).pipe(
            catchError(this.apiService.handleError<TokenValue>('Error occurred while updating token value')));
    }

    updateBulk(data: { id: number, value: number }[]): Observable<unknown> {
        const url = this.apiService.getURL('token-values', 'update-bulk');
        return this.http.patch(url, {data})
            .pipe(catchError(this.apiService.handleError('Error occurred while updating token values')));
    }
}
