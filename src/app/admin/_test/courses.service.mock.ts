import {Injectable} from '@angular/core'
import {Observable, of} from "rxjs"
import {Course} from "@app/_models"
import {MOCK_VIEW_COURSE} from "@app/admin/_test/mock"

@Injectable({
    providedIn: 'root'
})
export class ViewCoursesService {
    getCourses(): Observable<Course[]> {
        return of([MOCK_VIEW_COURSE])
    }
}
