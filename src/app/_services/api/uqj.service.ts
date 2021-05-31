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
            .pipe(catchError(this.apiService.handleError<PaginatedResult<UQJ>>(`Error occurred while fetching UQJs`)));
    }

    getUQJ(uqjId: number): Observable<UQJ> {
        const params = new HttpParams();
        const url = this.apiService.getURL('uqj', uqjId);
        return this.http
            .get<UQJ>(url, {params})
            .pipe(catchError(this.apiService.handleError<UQJ>(`Error occurred while fetching UQJ`)));
    }

    getUQJByQuestion(questionId: number): Observable<UQJ> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('uqj');
        return this.http
            .get<PaginatedResult<UQJ>>(url, {params})
            .pipe(map(x => x.results[0]))
            .pipe(catchError(this.apiService.handleError<UQJ>(`Error Occurred while fetching UQJ for this question`)));
    }
}
