import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {QuestionCount} from '@app/_models/question_counts';

@Injectable({
    providedIn: 'root'
})
export class QuestionCountService {
    private questionCountUrl = new URL('/api/admin/question-count/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {}

    getQuestionCounts(): Observable<QuestionCount[]> {
        return this.http
            .get<QuestionCount[]>(this.questionCountUrl)
            .pipe(catchError(this.handleError<QuestionCount[]>('getQuestionCounts', [])));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
