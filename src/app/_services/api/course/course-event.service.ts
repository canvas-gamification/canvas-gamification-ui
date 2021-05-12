import {Injectable} from '@angular/core';
import {CourseEvent, EventType} from '@app/_models';
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

    getCourseEvent(courseEventId: number): Observable<CourseEvent> {
        return this.http
            .get<CourseEvent>(`${this.courseEventUrl}${courseEventId}/`)
            .pipe(catchError(this.handleError<CourseEvent>('getCourseEvent')));
    }

    deleteCourseEvent(courseEventId: number): Observable<CourseEvent> {
        return this.http
            .delete<CourseEvent>(`${this.courseEventUrl}${courseEventId}/`)
            .pipe(catchError(this.handleError<CourseEvent>('deleteCourseEvent')));
    }

    addCourseEvent(courseEvent: CourseEvent): Observable<CourseEvent> {
        return this.http
            .post<CourseEvent>(this.courseEventUrl, courseEvent)
            .pipe(catchError(this.handleError<CourseEvent>('addCourseEvent', courseEvent)));
    }

    updateCourseEvent(courseEvent: CourseEvent): Observable<CourseEvent> {
        return this.http.put<CourseEvent>(`${this.courseEventUrl}${courseEvent.id}/`, courseEvent).pipe(
            catchError(this.handleError<CourseEvent>('updateCourseEvent', courseEvent))
        );
    }

    getEventTypes(): Observable<EventType[]> {
        return this.http
            .get<EventType[]>(`${this.courseEventUrl}get-event-types/`)
            .pipe(catchError(this.handleError<EventType[]>(
                `getEventTypes`
            )));
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
