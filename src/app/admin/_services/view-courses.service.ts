import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {Observable} from "rxjs";
import {AdminCourse} from "@app/_models";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ViewCoursesService {

    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    viewCourses(): Observable<AdminCourse[]> {
        const url = this.apiService.getURL('admin/courses');
        return this.http
            .get<AdminCourse[]>(url)
            .pipe(catchError(this.apiService.handleError<AdminCourse[]>('Unable to get courses', [])));
    }
}
