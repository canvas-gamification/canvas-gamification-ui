import {Injectable} from '@angular/core'
import {CourseEvent, EventType} from '@app/_models'
import {Observable} from 'rxjs'
import {HttpClient, HttpResponse} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import {ApiService} from "@app/_services/api.service"
import {EventStats} from '@app/_models/event/event_stats'

@Injectable({
    providedIn: 'root',
})
export class CourseEventService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {
    }

    getCourseEvent(courseEventId: number): Observable<CourseEvent> {
        const url = this.apiService.getURL('event', courseEventId)
        return this.http
            .get<CourseEvent>(url)
            .pipe(catchError(
                this.apiService.handleError<CourseEvent>(
                    `Error occurred while fetching Course Event`
                )
            ))
    }

    deleteCourseEvent(courseEventId: number): Observable<CourseEvent> {
        const url = this.apiService.getURL('event', courseEventId)
        return this.http
            .delete<CourseEvent>(url)
            .pipe(catchError(
                this.apiService.handleError<CourseEvent>(
                    `Error occurred while deleting Course Event`
                )
            ))
    }

    addCourseEvent(courseEvent: CourseEvent): Observable<CourseEvent> {
        const url = this.apiService.getURL('event')
        return this.http
            .post<CourseEvent>(url, courseEvent)
            .pipe(catchError(
                this.apiService.handleError<CourseEvent>(`Error occurred while adding Course Event`)
            ))
    }

    updateCourseEvent(courseEvent: CourseEvent): Observable<CourseEvent> {
        const url = this.apiService.getURL('event', courseEvent.id)
        return this.http.put<CourseEvent>(url, courseEvent)
            .pipe(catchError(
                this.apiService.handleError<CourseEvent>(
                    `Error occurred while updating Course Event`
                )
            ))
    }

    getEventTypes(): Observable<EventType[]> {
        const url = this.apiService.getURL('event', 'get-event-types')
        return this.http
            .get<EventType[]>(url)
            .pipe(catchError(
                this.apiService.handleError<EventType[]>(
                    `Error occurred while fetching event types`
                )
            ))
    }

    /**
     * Get all challenge to the server.
     */
    getChallengeTypes(): Observable<EventType[]> {
        const url = this.apiService.getURL('event', 'get-challenge-types')
        return this.http
            .get<EventType[]>(url)
            .pipe(catchError(this.apiService.handleError<EventType[]>(`Error occurred while fetching challenge types`)))
    }

    /**
     * Gets all events from the server.
     */
    getAllEvents(): Observable<CourseEvent[]> {
        const url = this.apiService.getURL('event')
        return this.http
            .get<CourseEvent[]>(url)
            .pipe(catchError(
                this.apiService.handleError<CourseEvent[]>(`Error occurred while fetching events`)
            ))
    }

    /**
     * Makes a post request to import an existing event into the current course.
     * @param courseEvent - The event to import.
     * @param courseId - The course to import it into.
     */
    importCourseEvent(
        courseEvent: CourseEvent,
        courseId: number
    ): Observable<HttpResponse<unknown>> {
        const url = this.apiService.getURL('event', 'import-event')
        return this.http.post<HttpResponse<unknown>>(
            url,
            {
                event: courseEvent.id,
                course: courseId
            },
            {observe: 'response'}
        )
            .pipe(catchError(
                this.apiService.handleError<HttpResponse<unknown>>(
                    `Error occurred during question import.`
                )
            ))
    }

    getStats(eventId: number): Observable<EventStats> {
        const url = this.apiService.getURL('event', eventId, 'stats')
        return this.http.get<EventStats>(url)
            .pipe(catchError(
                this.apiService.handleError<EventStats>(`Error occurred while fetching event stats`)
            ))
    }

    setFeatured(eventId: number): Observable<unknown> {
        const url = this.apiService.getURL('event', eventId, 'set-featured')
        return this.http.post(url, null)
            .pipe(catchError(
                this.apiService.handleError<EventStats>(`Error occurred while setting featured`)
            ))
    }
}
