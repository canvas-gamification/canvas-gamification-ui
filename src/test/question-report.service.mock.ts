import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Question, User} from '@app/_models';
import {QuestionReport} from "@app/_models/question_report";
import {MOCK_QUESTION_REPORT} from "@app/course/_test/mock";

@Injectable({
    providedIn: 'root'
})
export class QuestionReportServiceMock {
    getReport(userId: number, questionId: number): Observable<QuestionReport> {
       return of(MOCK_QUESTION_REPORT);
    }

    sendReport(data: { user: User, question: Question, report: string, report_details: string }): Observable<QuestionReport> {
        return of(MOCK_QUESTION_REPORT);
    }

    deleteReport(userId: number, questionId: number): Observable<QuestionReport> {
        return of(MOCK_QUESTION_REPORT);
    }
}
