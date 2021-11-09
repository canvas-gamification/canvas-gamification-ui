import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {QuestionReport} from "@app/_models/question_report";
import {MOCK_QUESTION_REPORT, MOCK_QUESTION_REPORT2} from "@app/course/_test/mock";


@Injectable({
    providedIn: 'root'
})
export class QuestionReportServiceMock {
    getReport(reportId: number): Observable<QuestionReport> {
        return of(MOCK_QUESTION_REPORT);
    }
    sendReport(data: { user: number, question: number, report: string, report_details: string }): Observable<QuestionReport> {
        return of(MOCK_QUESTION_REPORT);
    }

    updateReport(data: {report: string, report_details: string }, reportId: number): Observable<QuestionReport> {
        return of(MOCK_QUESTION_REPORT2);
    }
    deleteReport(reportId: number): Observable<QuestionReport> {
        return of(MOCK_QUESTION_REPORT);
    }
}
