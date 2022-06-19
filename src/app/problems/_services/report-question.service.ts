import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaderResponse} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {ProblemReportFormData} from "@app/problems/_forms/problem-report.form";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ReportQuestionService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    reportQuestion(questionId: number, input: ProblemReportFormData): Observable<HttpHeaderResponse> {
        const url = this.apiService.getURL('question-report');
        return this.http.post<HttpHeaderResponse>(url, {
            ...input,
            question: questionId,
        })
            .pipe(catchError(this.apiService.handleError<HttpHeaderResponse>(
                'Error occurred while submitting the question report.'
            )));
    }

}
