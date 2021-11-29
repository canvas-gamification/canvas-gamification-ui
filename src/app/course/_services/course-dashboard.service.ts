import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {CourseRegistration, CourseRegistrationData} from "@app/_models";
import {CourseDashboardFormData} from "@app/course/_forms/course-dashboard.form";

@Injectable({
    providedIn: 'root'
})
export class CourseDashboardService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getCourseUsers(courseId : number): Observable<CourseRegistration[]> {
        const url = this.apiService.getURL('course-admin', courseId, 'registered-users');
        return this.http.get<CourseRegistration[]>(url)
            .pipe(catchError(this.apiService.handleError<CourseRegistration[]>('Error occurred while fetching database', null)));
    }

    updateStatus(data: CourseRegistrationData): Observable<CourseRegistration> {
        const url = this.apiService.getURL('course-admin', 'change-status');
        return this.http.post<CourseRegistration>(url, data)
            .pipe(catchError(this.apiService.handleError<CourseRegistration>('Error occurred while changing status')));
    }

    getCourseUsersFilter(courseId: number, options?: CourseDashboardFormData ): Observable<CourseRegistration[]> {
        const url = this.apiService.getURL('course-admin', courseId, 'registered-users');
        const {
            name  = '',
            ordering = '',
        } = options ? options : {};
        const params = new HttpParams()
            .set('search', name)
            .set('ordering', ordering);
        return this.http.get<CourseRegistration[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<CourseRegistration[]>('Error occurred while fetching database')));
    }

    registerUser(data: CourseRegistrationData, courseId: number): Observable<CourseRegistration> {
        const url = this.apiService.getURL('course-admin', courseId, 'register-user');
        return this.http.post<CourseRegistration>(url, data)
            .pipe(catchError(this.apiService.handleError<CourseRegistration>('Student does not exist or has already registered.')));
    }

}
