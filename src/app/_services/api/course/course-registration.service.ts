import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CourseRegistration} from '@app/_models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CourseRegistrationService {
    private courseRegistrationUrl = new URL(
        '/api/course-registration',
        environment.apiBaseUrl
    ).toString();

    constructor(private http: HttpClient) {
    }

    /**
     * Retrieve all course registration objects with their info
     * @param options - Object of options for this request
     */
    getCourseRegistrations(options?: any): Observable<CourseRegistration[]> {
        const {filters = {}, ordering = {}, page = 1, page_size = 50} = options ? options : {};
        let params = new HttpParams()
            .set('page', page)
            .set('page_size', page_size);

        for (const field of Object.keys(filters)) {
            params = params.set(`${field}`, String(filters[field]));
        }

        const orderingFields = [];
        for (const field of Object.keys(ordering)) {
            if (ordering[field]) {
                orderingFields.push(`${field}`);
            } else {
                orderingFields.push(`-${field}`);
            }
        }
        params = params.set(`ordering`, `${orderingFields.join()}`);

        return this.http
            .get<CourseRegistration[]>(this.courseRegistrationUrl, {params})
            .pipe(
                catchError(
                    this.handleError<CourseRegistration[]>(
                        `getCourseRegistrations`
                    )
                )
            );
    }

    /**
     * Retrieve a specific course registration object with it's info
     * @param courseRegistrationId - Corresponds to the id of the course-registration object
     * @param options - Object of options for this request
     */
    getCourseRegistrationById(courseRegistrationId: number, options?: any): Observable<CourseRegistration> {
        const {filters = {}} = options ? options : {};
        let params = new HttpParams();

        for (const field of Object.keys(filters)) {
            params = params.set(`${field}`, String(filters[field]));
        }

        const url = `${this.courseRegistrationUrl}/${courseRegistrationId}`;
        return this.http
            .get<CourseRegistration>(url, {params})
            .pipe(
                catchError(
                    this.handleError<CourseRegistration>(
                        `getCourseRegistration`
                    )
                )
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
