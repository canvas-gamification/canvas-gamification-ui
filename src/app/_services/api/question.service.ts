import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '@app/_models';
import {PaginatedResult} from '@app/_models/paginatedResult';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    private questionServiceUrl = new URL('/api/questions/', environment.apiBaseUrl).toString();
    private multipleChoiceQuestionUrl = new URL('/api/multiple-choice-question/', environment.apiBaseUrl).toString();
    private javaQuestionUrl = new URL('/api/java-question/', environment.apiBaseUrl).toString();
    private parsonsQuestionUrl = new URL('/api/parsons-question/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getQuestions(options?): Observable<PaginatedResult<Question>> {
        const {page = 1, page_size = 50, search = '', category = '', difficulty = '', is_sample = ''} = options ? options : {};
        const params = new HttpParams()
            .set('page', page)
            .set('page_size', page_size)
            .set('search', search)
            .set('parent_category_name__exact', category)
            .set('difficulty', difficulty)
            .set('is_sample', is_sample);

        return this.http.get<PaginatedResult<Question>>(this.questionServiceUrl, {params});
    }

    getQuestion(id: number): Observable<Question> {
        return this.http.get<Question>(this.questionServiceUrl + id + '/');
    }

    getQuestionType(question: Question) {
        return question.type_name;
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

    putMultipleChoiceQuestion(input: any, id: number) {
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

    putJavaQuestion(input: any, id: number) {
        return this.http.put(this.javaQuestionUrl + id + '/', input, {responseType: 'text'}).pipe(
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

    putParsonsQuestion(input: any, id: number) {
        return this.http.put(this.parsonsQuestionUrl + id + '/', input, {responseType: 'text'}).pipe(
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

    postMultipleChoiceQuestion(input: any) {
        return this.http.post(this.multipleChoiceQuestionUrl, input, {responseType: 'text'}).pipe(
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

    postJavaQuestion(input: any) {
        return this.http.post(this.javaQuestionUrl, input, {responseType: 'text'}).pipe(
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

    postParsonsQuestion(input: any) {
        return this.http.post(this.parsonsQuestionUrl, input, {responseType: 'text'}).pipe(
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
