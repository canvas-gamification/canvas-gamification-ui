import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuestionSubmission} from '@app/_models/question_submission';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {
    private submissionUrl = new URL('api/submission/', environment.apiBaseUrl).toString();
    private answerSubmissionUrl = new URL('api/submission/submit/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    /**
     * Get a single submission
     * @param id - The id of the question
     */
    getSubmission(id: number): Observable<QuestionSubmission> {
        return this.http.get<QuestionSubmission>(`${this.submissionUrl}${id}/`);
    }

    /**
     * Get previous submissions for a question.
     * @param id - The id of the question
     * @param options - An object of options for this request
     */
    getPreviousSubmissions(id: number, options?: { ordering?: string }): Observable<QuestionSubmission[]> {
        let params = new HttpParams().set('question', String(id));
        const {ordering = {}} = options ? options : {};
        params = params.set('ordering', String(ordering));
        return this.http.get<QuestionSubmission[]>(this.submissionUrl, {params});
    }

    /**
     * Send a post request of the submission for a question
     * @param input
     */
    postQuestionSubmission(input: { question: number, solution: unknown }): Observable<string> {
        return this.http.post(this.answerSubmissionUrl, input, {responseType: 'text'}).pipe(
            map(
                (response) => {
                    if (response) {
                        return response;
                    }
                },
                (error: unknown) => {
                    return error;
                }
            )
        );
    }
}
