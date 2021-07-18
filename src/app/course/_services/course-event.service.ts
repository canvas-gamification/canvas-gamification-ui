import {Injectable} from '@angular/core';
import {APIResponse, CourseEvent, EventType} from '@app/_models';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";

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
        const url = this.apiService.getURL('event', courseEventId);
        return this.http
            .get<CourseEvent>(url)
            .pipe(catchError(this.apiService.handleError<CourseEvent>(`Error occurred while fetching Course Event`)));
    }

    deleteCourseEvent(courseEventId: number): Observable<CourseEvent> {
        const url = this.apiService.getURL('event', courseEventId);
        return this.http
            .delete<CourseEvent>(url)
            .pipe(catchError(this.apiService.handleError<CourseEvent>(`Error occurred while deleting Course Event`)));
    }

    addCourseEvent(courseEvent: CourseEvent): Observable<CourseEvent> {
        const url = this.apiService.getURL('event');
        return this.http
            .post<CourseEvent>(url, courseEvent)
            .pipe(catchError(this.apiService.handleError<CourseEvent>(`Error occurred while adding Course Event`)));
    }

    updateCourseEvent(courseEvent: CourseEvent): Observable<CourseEvent> {
        const url = this.apiService.getURL('event', courseEvent.id);
        return this.http.put<CourseEvent>(url, courseEvent)
            .pipe(catchError(this.apiService.handleError<CourseEvent>(`Error occurred while updating Course Event`)));
    }

    getEventTypes(): Observable<EventType[]> {
        const url = this.apiService.getURL('event', 'get-event-types');
        return this.http
            .get<EventType[]>(url)
            .pipe(catchError(this.apiService.handleError<EventType[]>(`Error occurred while fetching event types`)));
    }

    getAllEvents(): Observable<CourseEvent[]> {
        const url = this.apiService.getURL('event');
        return this.http
            .get<CourseEvent[]>(url)
            .pipe(catchError(this.apiService.handleError<CourseEvent[]>(`Error occurred while fetching events`)));
    }

    postDuplicateEvent(courseEvent: CourseEvent, courseId: number): Observable<APIResponse> {
        const url = this.apiService.getURL('event', 'duplicate-event');
        return this.http.post<APIResponse>(url, {
            event: courseEvent.id,
            course: courseId
        }).pipe(catchError(this.apiService.handleError<APIResponse>(`Error occurred during question import.`)));
    }
}
