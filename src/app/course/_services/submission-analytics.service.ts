import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {SubmissionAnalytics} from "@app/_models/submission_analytics";
import {PaginatedResult} from "@app/_models/paginatedResult";
import {environment} from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SubmissionAnalyticsService {

    constructor(private http: HttpClient,
        private apiService: ApiService) { }


    getJavaSubmissionAnalyticsByQuestion(questionId: number): Observable<SubmissionAnalytics[]> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('java-submission-analytics');
        return this.http
            .get<PaginatedResult<SubmissionAnalytics>>(url, {params})
            .pipe(map(x => x.results))
            .pipe(catchError(this.apiService.handleError<SubmissionAnalytics[]>(`Error Occurred while fetching user-specific data for this submission analytics`)));
    }

    getParsonsSubmissionAnalyticsByQuestion(questionId: number): Observable<SubmissionAnalytics[]> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('parsons-submission-analytics');
        return this.http
            .get<PaginatedResult<SubmissionAnalytics>>(url, {params})
            .pipe(map(x => x.results))
            .pipe(catchError(this.apiService.handleError<SubmissionAnalytics[]>(`Error Occurred while fetching user-specific data for this submission analytics`)));
    }

    getMCQSubmissionAnalyticsByQuestion(questionId: number): Observable<SubmissionAnalytics[]> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('mcq-submission-analytics');
        return this.http
            .get<PaginatedResult<SubmissionAnalytics>>(url, {params})
            .pipe(map(x => x.results))
            .pipe(catchError(this.apiService.handleError<SubmissionAnalytics[]>(`Error Occurred while fetching user-specific data for this submission analytics`)));
    }

    initSubmissionAnalytics(): Observable<any>{
        const url =  new URL('analytics/submission-analytics', environment.apiBaseUrl).toString();
        return this.http.get(url);
    }
}
