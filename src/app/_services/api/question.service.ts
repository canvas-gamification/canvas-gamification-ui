import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '@app/_models';
import {PaginatedResult} from '@app/_models/paginatedResult';
import {map} from 'rxjs/operators';
import {QuestionSubmission} from '@app/_models/questionSubmission';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    private questionServiceUrl = new URL('/api/questions/', environment.apiBaseUrl).toString();
    private multipleChoiceQuestionUrl = new URL('/api/multiple-choice-question/', environment.apiBaseUrl).toString();
    private javaQuestionUrl = new URL('/api/java-question/', environment.apiBaseUrl).toString();
    private parsonsQuestionUrl = new URL('/api/parsons-question/', environment.apiBaseUrl).toString();
    private submissionUrl = new URL('api/submission/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getQuestions(options?): Observable<PaginatedResult<Question>> {
        const {page = 1, page_size = 50} = options ? options : {};
        const params = new HttpParams()
            .set('page', page)
            .set('page_size', page_size);

        return this.http.get<PaginatedResult<Question>>(this.questionServiceUrl, {params});
    }

    getQuestion(id: number): Observable<Question> {
        return this.http.get<Question>(this.questionServiceUrl + id + '/');
    }

    getMultipleChoiceQuestion(id: number): Observable<Question> {
        return this.http.get<Question>(this.multipleChoiceQuestionUrl + id + '/');
    }

    getJavaQuestion(id: number): Observable<Question> {
        return this.http.get<Question>(this.javaQuestionUrl + id + '/');
    }

    getParsonsQuestion(id: number): Observable<Question> {
        return this.http.get<Question>(this.parsonsQuestionUrl + id + '/');
    }

    getQuestionType(question: Question) {
        return question.type_name;
    }

    getPreviousSubmissions(id: number): Observable<QuestionSubmission[]> {
        return this.http.get<QuestionSubmission[]>(this.submissionUrl + '?question=' + id);
    }

    deleteQuestion(id: number) {
        return this.http.delete(this.questionServiceUrl + id + '/', {responseType: 'text'}).pipe(
            map(
                (response) => {
                    if (response) {
                        return response;
                    }
                },
                (error: any) => {
                    return error;
                }
            )
        );
    }

    putQuestion(input: any, id: number) {
        return this.http.put(this.multipleChoiceQuestionUrl + id + '/', input, {responseType: 'text'}).pipe(
            map(
                (response) => {
                    if (response) {
                        return response;
                    }
                },
                (error: any) => {
                    return error;
                }
            )
        );
    }
}
