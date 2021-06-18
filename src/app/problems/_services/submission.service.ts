import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuestionSubmission} from '@app/_models/question_submission';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {APIResponse} from "@app/_models";

@Injectable({
    providedIn: null
})
export class SubmissionService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    /**
     * Get a single submission
     * @param id - The id of the question
     */
    getSubmission(id: number): Observable<QuestionSubmission> {
        const url = this.apiService.getURL('submission', id);
        return this.http.get<QuestionSubmission>(url)
            .pipe(catchError(this.apiService.handleError<QuestionSubmission>('Error occurred while fetching submission')));
    }

    /**
     * Get previous submissions for a question.
     * @param id - The id of the question
     * @param options - An object of options for this request
     */
    getPreviousSubmissions(id: number, options?: { ordering?: string }): Observable<QuestionSubmission[]> {
        const url = this.apiService.getURL('submission');
        let params = new HttpParams().set('question', String(id));
        const {ordering = {}} = options ? options : {};
        params = params.set('ordering', String(ordering));
        return this.http.get<QuestionSubmission[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<QuestionSubmission[]>('Error occurred while fetching submissions')));
    }

    /**
     * Send a post request of the submission for a question
     * @param input
     */
    postQuestionSubmission(input: { question: number, solution: unknown }): Observable<APIResponse> {
        const url = this.apiService.getURL('submission', 'submit');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>('Error occurred while submitting questions', {
                success: false,
                bad_request: true
            })));
    }
}
