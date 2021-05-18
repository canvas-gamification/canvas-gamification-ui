import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UQJ} from '@app/_models/uqj';
import {PaginatedResult} from '@app/_models/paginatedResult';

@Injectable({
    providedIn: 'root'
})
export class UqjService {
    private userUqjUrl = new URL(
        '/api/uqj/',
        environment.apiBaseUrl
    ).toString();

    constructor(private http: HttpClient) {
    }

    getUQJs(options?: {
        filters?: unknown,
        ordering?: unknown,
        page?: number,
        pageSize?: number,
        recent?: boolean
    }): Observable<PaginatedResult<UQJ>> {
        const {filters = {}, page = 1, pageSize = 50} = options ? options : {};
        let params = new HttpParams()
            .set('page', String(page))
            .set('page_size', String(pageSize));

        for (const field of Object.keys(filters)) {
            params = params.set(`${field}`, String(filters[field]));
        }

        if (options?.recent ?? false) {
            params = params.set('ordering', '-last_viewed');
        }

        return this.http
            .get<PaginatedResult<UQJ>>(this.userUqjUrl, {params})
            .pipe(
                catchError(
                    this.handleError<PaginatedResult<UQJ>>(
                        `getAllUserUQJ`
                    )
                )
            );
    }

    getUQJ(uqjId: number): Observable<UQJ> {
        const params = new HttpParams();

        const url = `${this.userUqjUrl}${uqjId}/`;
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

    getUQJByQuestion(questionId: number): Observable<UQJ> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = `${this.userUqjUrl}`;
        return this.http
            .get<PaginatedResult<UQJ>>(url, {params})
            .pipe(map(x => x.results[0]))
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
    private handleError<T>(operation?, result?: T) {
        return (error: string): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
