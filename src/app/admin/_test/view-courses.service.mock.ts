import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {AdminCourse} from "@app/_models";
import {MOCK_VIEW_COURSE} from "@app/admin/_test/mock";

@Injectable({
    providedIn: 'root'
})
export class ViewCoursesService {
    viewCourses(): Observable<AdminCourse[]> {
        return of([MOCK_VIEW_COURSE]);
    }
}
