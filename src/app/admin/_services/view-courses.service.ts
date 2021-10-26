import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {Observable} from "rxjs";
import {ViewCourse} from "@app/_models";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ViewCoursesService {

    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    viewCourses(): Observable<ViewCourse[]> {
        const url = this.apiService.getURL('admin/view-courses');
        return this.http
            .get<ViewCourse[]>(url)
            .pipe(catchError(this.apiService.handleError<ViewCourse[]>('Unable to get courses', [])));
    }
}
