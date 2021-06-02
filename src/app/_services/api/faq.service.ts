import {Injectable} from '@angular/core';
import {FAQ} from '@app/_models/FAQ';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FaqService {
    private faqsUrl = new URL('/api/faq/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getFaqs(): Observable<FAQ[]> {
        return this.http
            .get<FAQ[]>(this.faqsUrl)
            .pipe(catchError(this.handleError<FAQ[]>('getFaq', [])));
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

