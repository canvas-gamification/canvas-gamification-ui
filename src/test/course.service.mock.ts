import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {APIResponse, Course} from "@app/_models";
import {MOCK_COURSE} from "@app/problems/_test/mock";
import {MOCK_COURSE1} from "@app/course/_test/mock";

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
}
