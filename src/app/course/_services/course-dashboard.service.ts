import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {CourseRegistration, User} from "@app/_models";

@Injectable({
    providedIn: 'root'
})
export class CourseDashboardServiceService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getCourseDashboard(options): Observable<User[]> {
        const url = this.apiService.getURL('list-course-user');

        const params = new HttpParams()
            .set('canvascourseregistration__course__id', options);

        return this.http
            .get<User[]>(url,{params})
            .pipe(catchError(this.apiService.handleError<User[]>('Error occurred while fetching database', null)));
    }

    getCourseRegistration(options): Observable<CourseRegistration[]> {
        const url = this.apiService.getURL('course-registration');

        const params = new HttpParams()
            .set('course', options);

        return this.http
            .get<CourseRegistration[]>(url,{params})
            .pipe(catchError(this.apiService.handleError<CourseRegistration[]>('Error occurred while fetching database', null)));
    }


}
