import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {
    APIResponse,
    Course,
    CourseRegistrationRequest,
    CourseRegistrationResponse,
    REGISTRATION_STATUS,
    RegistrationStatus
} from "@app/_models";
import {MOCK_COURSE} from "@app/problems/_test/mock";
import {MOCK_COURSE1, MOCK_COURSE_REGISTRATION_RESPONSE} from "@app/course/_test/mock";

@Injectable({
    providedIn: 'root'
})
export class CourseServiceMock {
    getCourses(): Observable<Course[]> {
        return of([MOCK_COURSE]);
    }

    getCourse(courseId: number): Observable<Course> {
        return of(MOCK_COURSE1);
    }

    validateEvent(courseId: number, eventId: number): Observable<APIResponse> {
        //only returns bad request when the eventId is 0, for testing purposes.
        if (eventId === 0)
            return of({success: false, bad_request: true});
        else
            return of({success: true, bad_request: false});
    }

    getCourseRegistrationStatus(courseId: number): Observable<RegistrationStatus> {
        return of({status: REGISTRATION_STATUS.NOT_REGISTERED, message: null});
    }

    register(courseId: number, data: CourseRegistrationRequest): Observable<CourseRegistrationResponse> {
        return of({success: true});
    }

    registerVerify(courseId: number, data: CourseRegistrationRequest): Observable<CourseRegistrationResponse> {
        return of({attempts_remaining: MOCK_COURSE_REGISTRATION_RESPONSE.attempts_remaining, success: true});
    }

    getUserStats(courseId: number, categoryId: number): Observable<{ success_rate: number }> {
        return of({success_rate: 1});
    }
}
