import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuestionSubmission} from '@app/_models/question_submission';
import {map} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getSubmission(id: number): Observable<QuestionSubmission> {
        const url = this.apiService.getURL('submission', id);
        return this.http.get<QuestionSubmission>(url);
    }

    getPreviousSubmissions(id: number): Observable<QuestionSubmission[]> {
        const url = this.apiService.getURL('submission');
        const params = new HttpParams().set('question', String(id));
        return this.http.get<QuestionSubmission[]>(url, {params});
    }

    postQuestionSubmission(input: { question: number, solution: unknown }): Observable<string> {
        const url = this.apiService.getURL('submission', 'submit');
        return this.http.post(url, input, {responseType: 'text'}).pipe(
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
