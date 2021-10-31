import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ViewCourse} from "@app/_models";
import {MOCK_VIEW_COURSE} from "@app/admin/_test/mock";

@Injectable({
    providedIn: 'root'
})
export class ViewCoursesService {
    viewCourses(): Observable<ViewCourse[]> {
        return of([MOCK_VIEW_COURSE]);
    }
}
