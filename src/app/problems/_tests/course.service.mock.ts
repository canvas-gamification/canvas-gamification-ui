import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Course} from "@app/_models";
import {MOCK_COURSE} from "@app/problems/_tests/mock";

@Injectable({
    providedIn: 'root'
})
export class CourseServiceMock {
    getCourses(): Observable<Course[]> {
        return of([MOCK_COURSE]);
    }
}
