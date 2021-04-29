import {Injectable} from '@angular/core';
import {environment} from '@environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryStatsService {
    private categoryStatsUrl = new URL('/api/admin/category-stats', environment.apiBaseUrl);

    constructor(private http: HttpClient) {
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
