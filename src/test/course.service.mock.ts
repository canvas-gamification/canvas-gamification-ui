import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Course} from "@app/_models";
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
}
