import {Observable, of} from "rxjs"
import {MOCK_COURSE_EVENT} from "@app/problems/_test/mock"
import {CourseEvent, EventLimit, EventType, LeaderboardElement} from "@app/_models"
import {MOCK_EVENT_TYPES, MOCK_RANKED_LEADERBOARD} from "@app/course/_test/mock"
import {HttpResponse} from "@angular/common/http"
import {EventQuestionSetFormData} from "@app/course/_forms/course-event.form"
import {EventStats} from "@app/_models/event/event_stats"

export class CourseEventServiceMock {
    getCourseEvent(id: number): Observable<CourseEvent> {
        return of(MOCK_COURSE_EVENT)
    }

    getEventTypes(): Observable<EventType[]> {
        return of(MOCK_EVENT_TYPES)
    }

    getAllEvents(): Observable<CourseEvent[]> {
        return of([MOCK_COURSE_EVENT])
    }

    importCourseEvent(event: CourseEvent, courseId: number): Observable<HttpResponse<unknown>> {
        return of(new HttpResponse())
    }

    addCourseEvent(courseEvent: CourseEvent): Observable<CourseEvent> {
        return of(MOCK_COURSE_EVENT)
    }

    updateCourseEvent(courseEvent: CourseEvent): Observable<CourseEvent> {
        return of(MOCK_COURSE_EVENT)
    }

    getStats(eventId: number): Observable<EventStats> {
        return of()
    }

    setFeatured(eventId: number): Observable<unknown> {
        return of()
    }

    addQuestion(eventId: number, questionId: number): Observable<unknown> {
        return of()
    }

    removeQuestion(eventId: number, questionId: number): Observable<unknown> {
        return of()
    }

    addQuestionSet(input: EventQuestionSetFormData, eventId: number): Observable<unknown> {
        return of()
    }

    getEventLeaderBoard(eventId: number): Observable<LeaderboardElement[]>{
        return of(MOCK_RANKED_LEADERBOARD)
    }

    getLimits(): Observable<EventLimit[]> {
        return of()
    }
}
