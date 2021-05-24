import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {MultipleChoiceQuestion} from '@app/_models';

@Injectable({
    providedIn: 'root'
})
export class SampleQuestionService {

    private sampleMultipleChoiceQuestionsUrl = new URL('/api/sample-multiple-choice-question/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getSampleMultipleChoiceQuestions(): Observable<MultipleChoiceQuestion[]> {
        return this.http.get<MultipleChoiceQuestion[]>(this.sampleMultipleChoiceQuestionsUrl);
    }
}
