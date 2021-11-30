import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {QuestionReport} from "@app/_models/question_report";

@Injectable({
    providedIn: 'root'
})
export class QuestionReportService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService) {
    }

    getReports(options?: {
        filters?: unknown,
        ordering?: unknown,
        page?: number,
        pageSize?: number
    }): Observable<QuestionReport[]> {
        const {filters = {}, ordering = {}, page = 1, pageSize = 50} = options ? options : {};
        const url = this.apiService.getURL('question-report');
        let params = new HttpParams()
            .set('page', String(page))
            .set('page_size', String(pageSize));

        for (const field of Object.keys(filters)) {
            params = params.set(`${field}`, String(filters[field]));
        }

        const orderingFields = [];
        for (const field of Object.keys(ordering)) {
            if (ordering[field]) {
                orderingFields.push(`${field}`);
            } else {
                orderingFields.push(`-${field}`);
            }
        }
        params = params.set(`ordering`, `${orderingFields.join()}`);

        return this.http
            .get<QuestionReport[]>(url, {params})
            .pipe(
                catchError(
                    this.apiService.handleError<QuestionReport[]>(`Unable to get all reports.`, [])
                )
            );
    }


    getReport(reportId: number): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report', reportId);
        return this.http
            .get<QuestionReport>(url)
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while fetching a report')));
    }

    sendReport(data: { user: number, question: number, report: string, report_details: string }): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report');
        return this.http
            .post<QuestionReport>(url, data)
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while creating a report')));
    }

    updateReport(data: {report: string, report_details: string }, reportId: number): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report', reportId);
        return this.http
            .patch<QuestionReport>(url, data)
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while updating a report')));
    }

    deleteReport(reportId: number): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report', reportId);
        return this.http
            .delete<QuestionReport>(url)
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while deleting a report')));
    }
}
