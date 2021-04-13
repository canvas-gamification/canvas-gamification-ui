import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuestionSubmission} from '@app/_models/question_submission';

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {
    private submissionUrl = new URL('api/submission/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getSubmission(id: number): Observable<QuestionSubmission> {
        return this.http.get<QuestionSubmission>(`${this.submissionUrl}${id}`);
    }
}
