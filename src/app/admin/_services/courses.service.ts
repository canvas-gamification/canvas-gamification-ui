import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {Observable} from "rxjs";
import {Course} from "@app/_models";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    viewCourses(): Observable<Course[]> {
        const url = this.apiService.getURL('admin/courses');
        return this.http
            .get<Course[]>(url)
            .pipe(catchError(this.apiService.handleError<Course[]>('Unable to get courses', [])));
    }
}
