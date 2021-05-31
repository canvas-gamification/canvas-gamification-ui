import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse, Question} from '@app/_models';
import {PaginatedResult} from '@app/_models/paginatedResult';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getQuestions(options?: {
        page: number,
        page_size: number,
        search: string,
        parentCategory: string,
        subCategory: string,
        difficulty: string,
        is_sample: string,
        ordering: string
    }): Observable<PaginatedResult<Question>> {
        const url = this.apiService.getURL('questions');
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

        return this.http.get<PaginatedResult<Question>>(url, {params})
            .pipe(catchError(this.apiService.handleError<PaginatedResult<Question>>('Error occurred while fetching questions')));
    }

    getQuestion(id: number): Observable<Question> {
        const url = this.apiService.getURL('questions', id);
        return this.http.get<Question>(url)
            .pipe(catchError(this.apiService.handleError<Question>('Error occurred while fetching question')));
    }

    getQuestionType(question: Question): string {
        return question.type_name;
    }

    deleteQuestion(id: number): Observable<string> {
        const url = this.apiService.getURL('questions', id);
        return this.http.delete<string>(url)
            .pipe(catchError(this.apiService.handleError<string>('Error occurred while deleting question')));
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
        choices: { [id: string]: string }
    }, id: number): Observable<APIResponse> {
        const url = this.apiService.getURL('multiple-choice-question', id);
        return this.http.put<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>(
                'Error occurred while updating question', {success: false, bad_request: true})));
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
    }, id: number): Observable<APIResponse> {
        const url = this.apiService.getURL('java-question', id);
        return this.http.put<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>(
                'Error occurred while updating question', {success: false, bad_request: true})));
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
    }, id: number): Observable<APIResponse> {
        const url = this.apiService.getURL('parsons-question', id);
        return this.http.put<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>(
                'Error occurred while updating question', {success: false, bad_request: true})));
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
        choices: { [id: string]: string }
    }): Observable<APIResponse> {
        const url = this.apiService.getURL('multiple-choice-question');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>(
                'Error occurred while adding question', {success: false, bad_request: true})));
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
    }): Observable<APIResponse> {
        const url = this.apiService.getURL('java-question');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>(
                'Error occurred while adding question', {success: false, bad_request: true})));
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
    }): Observable<APIResponse> {
        const url = this.apiService.getURL('parsons-question');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>(
                'Error occurred while adding question', {success: false, bad_request: true})));
    }
}
