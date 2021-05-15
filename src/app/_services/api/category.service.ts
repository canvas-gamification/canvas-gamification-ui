import {Injectable} from '@angular/core';
import {Category} from '@app/_models';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private categoriesUrl = new URL('/api/question-category/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getCategories(): Observable<Category[]> {
        return this.http
            .get<Category[]>(this.categoriesUrl)
            .pipe(catchError(this.handleError<Category[]>('getCategories', [])));
    }

    getCategory(categoryId : number): Observable<Category> {
        return this.http
            .get<Category>(this.categoriesUrl + `${categoryId}/`)
            .pipe(catchError(this.handleError<Category>('getCategory')));
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation?, result?: T) {
        return (error: string): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
