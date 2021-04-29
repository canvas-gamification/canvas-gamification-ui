import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CategoryStats} from '@app/_models/category_stats';

@Injectable({
    providedIn: 'root'
})
export class CategoryStatsService {
    private categoryStatsUrl = new URL('/api/admin/category-stats/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getCategoryStats(): Observable<CategoryStats[]> {
        return this.http
            .get<CategoryStats[]>(this.categoryStatsUrl)
            .pipe(catchError(this.handleError<CategoryStats[]>('getCategoryStats', [])));
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
