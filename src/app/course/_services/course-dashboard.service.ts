import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {CourseRegistration, CourseRegistrationStatus} from "@app/_models";
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

    updateStatus(data: CourseRegistrationStatus, courseId : number): Observable<CourseRegistration> {
        const url = this.apiService.getURL('course-admin', courseId, 'change-status');
        return this.http.post<CourseRegistration>(url, data)
            .pipe(catchError(this.apiService.handleError<CourseRegistration>('Error occurred while changing status')));
    }

    getCourseUsersFilter(courseId: number, options?: CourseDashboardFormData ): Observable<CourseRegistration[]> {
        const url = this.apiService.getURL('course-admin', courseId, 'registered-users');
        const {
            name  = '',
        } = options ? options : {};
        const params = new HttpParams()
            .set('search', name);
        return this.http.get<CourseRegistration[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<CourseRegistration[]>('Error occurred while fetching database')));
    }

    // To do: wait for backend to implement unregister action. Need to talk with Keyvan more about the idea
    unregisterUser(courseRegId: number): Observable<string> {
        const url = this.apiService.getURL('course-registration', courseRegId);
        return this.http.delete<string>(url)
            .pipe(catchError(this.apiService.handleError<string>('Error occurred while deleting user')));
    }

}
