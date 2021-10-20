import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question, UQJ} from '@app/_models';
import {PaginatedResult} from '@app/_models/paginatedResult';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {ProblemSetFormData} from "@app/problems/_forms/problem-set.form";
import {McqFormData} from "@app/problems/_forms/mcq.form";
import {JavaFormData} from "@app/problems/_forms/java.form";
import {ParsonsFormData} from "@app/problems/_forms/parsons.form";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    /**
     * Get all questions from the server, filter based on the options.
     * @param options - Filter options.
     */
    getQuestions(options?: ProblemSetFormData): Observable<PaginatedResult<Question>> {
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

    /**
     * Get a single question from the server.
     * @param id - The question id to retrieve.
     */
    getQuestion(id: number): Observable<Question> {
        const url = this.apiService.getURL('questions', id);
        return this.http.get<Question>(url)
            .pipe(catchError(this.apiService.handleError<Question>('Error occurred while fetching question')));
    }

    /**
     * Get the type of a question.
     * @param question - The question object.
     */
    getQuestionType(question: Question): string {
        return question.type_name;
    }

    /**
     * Delete a question.
     * @param id - The id of the question to delete.
     */
    deleteQuestion(id: number): Observable<HttpResponse<Question>> {
        const url = this.apiService.getURL('questions', id);
        return this.http.delete<Question>(url, {observe: 'response'})
            .pipe(catchError(this.apiService.handleError<HttpResponse<Question>>('Error occurred while deleting question')));
    }

    /**
     * Update a multiple choice.
     * @param input - The mcq object.
     * @param id - The question id.
     */
    putMultipleChoiceQuestion(input: McqFormData, id: number): Observable<HttpResponse<Question>> {
        const url = this.apiService.getURL('multiple-choice-question', id);
        return this.http.put<Question>(url, input, {observe: 'response'})
            .pipe(catchError(this.apiService.handleError<HttpResponse<Question>>(
                'Error occurred while updating question')));
    }

    /**
     * Update a java question.
     * @param input - The java question object.
     * @param id - The question id.
     */
    putJavaQuestion(input: JavaFormData, id: number): Observable<HttpResponse<Question>> {
        const url = this.apiService.getURL('java-question', id);
        return this.http.put<Question>(url, input, {observe: 'response'})
            .pipe(catchError(this.apiService.handleError<HttpResponse<Question>>(
                'Error occurred while updating question')));
    }

    /**
     * Update a parsons question.
     * @param input - The parsons question object.
     * @param id - The question id.
     */
    putParsonsQuestion(input: ParsonsFormData, id: number): Observable<HttpResponse<Question>> {
        const url = this.apiService.getURL('parsons-question', id);
        return this.http.put<Question>(url, input, {observe: 'response'})
            .pipe(catchError(this.apiService.handleError<HttpResponse<Question>>(
                'Error occurred while updating question')));
    }

    /**
     * Create a multiple choice question.
     * @param input - The mcq object.
     */
    postMultipleChoiceQuestion(input: McqFormData): Observable<HttpResponse<Question>> {
        const url = this.apiService.getURL('multiple-choice-question');
        return this.http.post<Question>(url, input, {observe: 'response'})
            .pipe(catchError(this.apiService.handleError<HttpResponse<Question>>(
                'Error occurred while adding question')));
    }

    /**
     * Create a java question.
     * @param input - The java question object.
     */
    postJavaQuestion(input: JavaFormData): Observable<HttpResponse<Question>> {
        const url = this.apiService.getURL('java-question');
        return this.http.post<Question>(url, input, {observe: 'response'})
            .pipe(catchError(this.apiService.handleError<HttpResponse<Question>>(
                'Error occurred while adding question')));
    }

    /**
     * Create a parsons question.
     * @param input - The parsons question object.
     */
    postParsonsQuestion(input: ParsonsFormData): Observable<HttpResponse<Question>> {
        const url = this.apiService.getURL('parsons-question');
        return this.http.post<Question>(url, input, {observe: 'response'})
            .pipe(catchError(this.apiService.handleError<HttpResponse<Question>>(
                'Error occurred while adding question')));
    }
}
