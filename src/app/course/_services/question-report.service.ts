import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
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
            .put<QuestionReport>(url, data)
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while updating a report')));
    }

    deleteReport(reportId: number): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report', reportId);
        return this.http
            .delete<QuestionReport>(url)
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while deleting a report')));
    }
}
