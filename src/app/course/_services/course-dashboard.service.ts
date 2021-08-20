import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {CourseRegistration, User} from "@app/_models";
import {CourseDashboardFormData} from "@app/course/_forms/course-dashboard.form";

@Injectable({
    providedIn: 'root'
})
export class CourseDashboardService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getCourseDashboard(options: number): Observable<User[]> {
        const url = this.apiService.getURL('list-course-user');

        const params = new HttpParams()
            .set('canvascourseregistration__course__id', String(options));

        return this.http
            .get<User[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<User[]>('Error occurred while fetching database', null)));
    }

    getAllUser(): Observable<User[]> {
        const url = this.apiService.getURL('list-user');
        return this.http.get<User[]>(url)
            .pipe(catchError(this.apiService.handleError<User[]>('Error occurred while fetching database')));
    }

    getCourseRegistration(options: number): Observable<CourseRegistration[]> {
        const url = this.apiService.getURL('course-registration');

        const params = new HttpParams()
            .set('course', String(options));

        return this.http
            .get<CourseRegistration[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<CourseRegistration[]>('Error occurred while fetching database', null)));
    }

    updateBlockStatus(courseReg: CourseRegistration): Observable<CourseRegistration> {
        const url = this.apiService.getURL('course-registration', courseReg.id);
        return this.http.put<CourseRegistration>(url, courseReg)
            .pipe(catchError(this.apiService.handleError<CourseRegistration>('Error occurred while changing status')));
    }

    unregisterUser(courseRegId: number): Observable<string> {
        const url = this.apiService.getURL('course-registration', courseRegId);
        return this.http.delete<string>(url)
            .pipe(catchError(this.apiService.handleError<string>('Error occurred while deleting user')));
    }

    getCourseDashboardFilter(id: number, options?: CourseDashboardFormData ): Observable<User[]> {
        const url = this.apiService.getURL('list-course-user');
        const {
            name  = '',
        } = options ? options : {};
        const params = new HttpParams()
            .set('search', name)
            .set('canvascourseregistration__course__id', String(id));

        return this.http.get<User[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<User[]>('Error occurred while fetching database')));
    }

    getUnregisteredStudents(courseId: number, options?: CourseDashboardFormData): Observable<User[]> {
        const {
            modalName  = '',
        } = options ? options : {};
        const params = new HttpParams()
            .set('search', modalName)
            .set('canvascourseregistration__course__id__not', String(courseId));

        const url = this.apiService.getURL('list-user');
        return this.http.get<User[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<User[]>('Error occurred while fetching database')));
    }
}
