import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UQJ} from '@app/_models/uqj';
import {PaginatedResult} from '@app/_models/paginatedResult';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class UqjService {
    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    /**
     * Get all UQJs from the server that meet the filtering options.
     * @param options - The options to filter the UQJs by.
     */
    getUQJs(options?: {
        filters?: unknown,
        ordering?: unknown,
        page?: number,
        pageSize?: number,
        recent?: boolean
    }): Observable<PaginatedResult<UQJ>> {
        const url = this.apiService.getURL('uqj');
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
            .get<PaginatedResult<UQJ>>(url, {params})
            .pipe(catchError(this.apiService.handleError<PaginatedResult<UQJ>>(`Error occurred while fetching user-specific questions`)));
    }

    /**
     * Get a single UQJ from the server.
     * @param uqjId - The id of the UQJ to retrieve.
     */
    getUQJ(uqjId: number): Observable<UQJ> {
        const params = new HttpParams();
        const url = this.apiService.getURL('uqj', uqjId);
        return this.http
            .get<UQJ>(url, {params})
            .pipe(catchError(this.apiService.handleError<UQJ>(`Error occurred while fetching user-specific questions`)));
    }

    /**
     * Get a single UQJ from the server - uses a question.
     * @param questionId - The question id that we want to retrieve a UQJ for.
     */
    getUQJByQuestion(questionId: number): Observable<UQJ> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('uqj');
        return this.http
            .get<PaginatedResult<UQJ>>(url, {params})
            .pipe(map(x => x.results[0]))
            .pipe(catchError(this.apiService.handleError<UQJ>(`Error Occurred while fetching user-specific data for this question`)));
    }

    updateFavourite(uqj : UQJ): void {
        const url = this.apiService.getURL('uqj', 1);
        this.http.put<UQJ>(url, uqj)
            .pipe(catchError(this.apiService.handleError<UQJ>('Error occurred while favorite the question')));
        console.log(url);
    }
}
