import {Injectable} from '@angular/core';
import {User} from '@app/_models/user';
import {Category} from '@app/_models/category';
import {Question} from "@app/_models/question";
import {Course} from "@app/_models/course";
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {PaginatedResult} from "@app/_models/paginatedResult";
import {ListUserFormData} from "@app/_forms/admin.form";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getAllUser(options?: ListUserFormData): Observable<User[]> {
        const url = this.apiService.getURL('list-user');
        const {
            role = '',
        } = options ? options : {};
        const params = new HttpParams()
            .set('role', role);

        return this.http.get<User[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<User[]>('Error occurred while fetching database')));
    }


    getAllCourseUser(options?: ListUserFormData): Observable<User[]> {
        const url = this.apiService.getURL('list-course-user');
        const {
            courseName = '',
        } = options ? options : {};
        const params = new HttpParams()
            .set('canvascourseregistration__course__name', courseName);

        return this.http.get<User[]>(url, {params})

            .pipe(catchError(this.apiService.handleError<User[]>('Error occurred while fetching database')));
    }
    getCategory(): Observable<Category[]> {
        const url = this.apiService.getURL('question-category');
        return this.http.get<Category[]>(url)
            .pipe(catchError(this.apiService.handleError<Category[]>('Error occurred while fetching database')));
    }
    getQuestion(): Observable<PaginatedResult<Question>> {
        const url = this.apiService.getURL('questions');
        return this.http.get<PaginatedResult<Question>>(url)
            .pipe(catchError(this.apiService.handleError<PaginatedResult<Question>>('Error occurred while fetching database')));
    }

    getCourseNames(): Observable<Course[]> {
        const url = this.apiService.getURL('course_names');
        return this.http.get<Course[]>(url)
            .pipe(catchError(this.apiService.handleError<Course[]>('Error occurred while fetching database')));
    }}

