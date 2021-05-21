import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '@app/_models';
import {PaginatedResult} from '@app/_models/paginatedResult';
import {map} from 'rxjs/operators';
import {FormArray} from "@angular/forms";

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

    getQuestions(options? : {
        page: number,
        page_size: number,
        search: string,
        parentCategory: string,
        subCategory : string,
        difficulty: string,
        is_sample: string,
        ordering: string }): Observable<PaginatedResult<Question>> {
        const {
            page = 1,
            page_size: pageSize = 50,
            search = '',
            parentCategory = '',
            subCategory = '',
            difficulty = '',
            is_sample: isSample = '',
            ordering = '',
        } = options ? options : {};
        const params = new HttpParams()
            .set('page', String(page))
            .set('page_size', String(pageSize))
            .set('search', search)
            .set('category__parent__name', parentCategory)
            .set('category__name', subCategory)
            .set('difficulty', difficulty)
            .set('is_sample', isSample)
            .set('ordering', ordering);

        return this.http.get<PaginatedResult<Question>>(this.questionServiceUrl, {params});
    }

    getQuestion(id: number): Observable<Question> {
        return this.http.get<Question>(this.questionServiceUrl + id + '/');
    }

    getQuestionType(question: Question) : string {
        return question.type_name;
    }

    deleteQuestion(id: number) : Observable<string> {
        return this.http.delete(this.questionServiceUrl + id + '/', {responseType: 'text'}).pipe(
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

    putMultipleChoiceQuestion(input: {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        answer: string,
        category: string,
        variables: JSON[],
        visible_distractor_count: number,
        choices: FormArray
    }, id: number) : Observable<string> {
        return this.http.put(this.multipleChoiceQuestionUrl + id + '/', input, {responseType: 'text'}).pipe(
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

    putJavaQuestion(input: {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        category: string,
        variables: JSON[],
        junit_template: string,
        input_file_names: JSON,
    }, id: number) : Observable<string> {
        return this.http.put(this.javaQuestionUrl + id + '/', input, {responseType: 'text'}).pipe(
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

    putParsonsQuestion(input: {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        category: string,
        variables: JSON[],
        lines: string[],
        additional_file_name: string,
        junit_template: string,
    }, id: number): Observable<string> {
        return this.http.put(this.parsonsQuestionUrl + id + '/', input, {responseType: 'text'}).pipe(
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

    postMultipleChoiceQuestion(input: {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        answer: string,
        category: string,
        variables: JSON[],
        visible_distractor_count: number,
        choices: FormArray
    }) : Observable<string> {
        return this.http.post(this.multipleChoiceQuestionUrl, input, {responseType: 'text'}).pipe(
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

    postJavaQuestion(input: {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        category: string,
        variables: JSON[],
        junit_template: string,
        input_file_names: JSON,
    }) : Observable<string> {
        return this.http.post(this.javaQuestionUrl, input, {responseType: 'text'}).pipe(
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

    postParsonsQuestion(input: {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        text: string,
        category: string,
        variables: JSON[],
        lines: string[],
        additional_file_name: string,
        junit_template: string,
    }) : Observable<string> {
        return this.http.post(this.parsonsQuestionUrl, input, {responseType: 'text'}).pipe(
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
