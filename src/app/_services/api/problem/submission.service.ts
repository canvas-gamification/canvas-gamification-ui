import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuestionSubmission} from '@app/_models/question_submission';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {APIResponse} from "@app/_models";

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getSubmission(id: number): Observable<QuestionSubmission> {
        const url = this.apiService.getURL('submission', id);
        return this.http.get<QuestionSubmission>(url)
            .pipe(catchError(this.apiService.handleError<QuestionSubmission>('Error occurred while fetching submission')));
    }

    getPreviousSubmissions(id: number): Observable<QuestionSubmission[]> {
        const url = this.apiService.getURL('submission');
        const params = new HttpParams().set('question', String(id));
        return this.http.get<QuestionSubmission[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<QuestionSubmission[]>('Error occurred while fetching submissions')));
    }

    postQuestionSubmission(input: { question: number, solution: unknown }): Observable<APIResponse> {
        const url = this.apiService.getURL('submission', 'submit');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>('Error occurred while submitting questions', {
                success: false,
                bad_request: true
            })));
    }
}
