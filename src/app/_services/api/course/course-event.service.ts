import {Injectable} from '@angular/core';
import {CourseEvent} from '@app/_models';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CourseEventService {
    private courseEventUrl = new URL('/api/event/', environment.apiBaseUrl).toString();

    constructor(
        private http: HttpClient,
    ) {
    }

    getCourseEvent(courseEventId): Observable<CourseEvent> {
        return this.http
            .get<CourseEvent>(`${this.courseEventUrl}${courseEventId}`)
            .pipe(catchError(this.handleError<CourseEvent>('getCourseEvent')));
    }

    deleteCourseEvent(courseEventId): Observable<{}> {
        return this.http
            .delete<CourseEvent>(`${this.courseEventUrl}${courseEventId}`)
            .pipe(catchError(this.handleError<CourseEvent>('deleteCourseEvent')));
    }

    getCourseEvents(): Observable<CourseEvent[]> {
        return this.http
            .get<CourseEvent[]>(this.courseEventUrl)
            .pipe(catchError(this.handleError<CourseEvent[]>('getCourseEvents', [])));
    }

    addCourseEvent(courseEvent: CourseEvent): Observable<CourseEvent> {
        return this.http
            .post<CourseEvent>(this.courseEventUrl, courseEvent)
            .pipe(catchError(this.handleError<CourseEvent>('addCourseEvent', courseEvent)));
    }

    updateCourseEvent(courseEvent: CourseEvent): Observable<CourseEvent> {
        return this.http.put<CourseEvent>(`${this.courseEventUrl}${courseEvent.id}`, courseEvent).pipe(
            catchError(this.handleError<CourseEvent>('updateCourseEvent', courseEvent))
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
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
