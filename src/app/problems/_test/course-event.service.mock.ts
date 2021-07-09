import {Observable, of} from "rxjs";
import {MOCK_COURSE_EVENT} from "@app/problems/_test/mock";
import {CourseEvent} from "@app/_models";

export class CourseEventServiceMock {
    getCourseEvent(id: number): Observable<CourseEvent> {
        return of(MOCK_COURSE_EVENT);
    }
}
