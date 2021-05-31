import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Action} from '@app/_models';
import {PaginatedResult} from '@app/_models/paginatedResult';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class UserActionsService {
    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getUserActions(options?: {
        filters?: unknown,
        ordering?: unknown,
        page?: number,
        pageSize?: number,
        recent?: boolean
    }): Observable<PaginatedResult<Action>> {
        const {page = 1, pageSize = 100} = options ? options : {};
        let params = new HttpParams()
            .set('page', String(page))
            .set('page_size', String(pageSize));

        if (options?.recent ?? false) {
            params = params.set('ordering', '-time_modified');
        }
        const url = this.apiService.getURL('user-actions');
        return this.http
            .get<PaginatedResult<Action>>(url, {params})
            .pipe(catchError(this.apiService.handleError<PaginatedResult<Action>>(`Error occurred while fetching user actions`)));
    }

    getUserAction(actionId: number): Observable<Action> {
        const params = new HttpParams();

        const url = this.apiService.getURL('user-actions', actionId);
        return this.http
            .get<Action>(url, {params})
            .pipe(catchError(this.apiService.handleError<Action>(`Error occurred while getting user action`)));
    }
}
