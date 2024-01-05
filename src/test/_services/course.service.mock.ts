import {Injectable} from "@angular/core"
import {Observable, of} from "rxjs"
import {
    APIResponse,
    Course, LeaderboardElement,
} from "@app/_models"
import {MOCK_COURSE} from "@app/problems/_test/mock"
import {MOCK_COURSE1, MOCK_GRADE_BOOK, MOCK_RANKED_LEADERBOARD} from "@app/course/_test/mock"
import {CourseRegistrationFormData} from "@app/course/_forms/register.form"
import {GradeBook} from "@app/_models/grade_book";

@Injectable({
    providedIn: 'root'
})
export class CourseServiceMock {
    getCourses(): Observable<Course[]> {
        return of([MOCK_COURSE])
    }

    getCourse(courseId: number): Observable<Course> {
        return of(MOCK_COURSE1)
    }

    validateEvent(courseId: number, eventId: number): Observable<APIResponse> {
        //only returns bad request when the eventId is 0, for testing purposes.
        if (eventId === 0)
            return of({success: false, bad_request: true})
        else
            return of({success: true, bad_request: false})
    }

    register(courseId: number, data: CourseRegistrationFormData): Observable<unknown> {
        return of({success: true})
    }

    getMyGrades(courseId: number): Observable<GradeBook> {
        return of(MOCK_GRADE_BOOK)
    }

    getUserStats(courseId: number, categoryId: number): Observable<{ success_rate: number }> {
        return of({success_rate: 1})
    }

    getCourseLeaderBoard(courseId: number): Observable<LeaderboardElement[]> {
        return of(MOCK_RANKED_LEADERBOARD)
    }
}
