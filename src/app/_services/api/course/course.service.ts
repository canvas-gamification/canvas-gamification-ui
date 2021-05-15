import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
    APIResponse,
    Course,
    CourseRegistrationRequest,
    CourseRegistrationResponse,
    RegistrationStatus
} from '@app/_models';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(private http: HttpClient,
                private apiService: ApiService) {
    }

    getUserStats(courseId: number, categoryId: number): Observable<{ success_rate: number }> {
        const url = this.apiService.getURL('course', courseId, 'user-stats', categoryId);
        return this.http
            .get<{ success_rate: number }>(url)
            .pipe(catchError(this.apiService.handleError<{ success_rate: number }>('')));
    }

    register(courseId: number, data: CourseRegistrationRequest): Observable<CourseRegistrationResponse> {
        const url = this.apiService.getURL('course', courseId, 'register');
        return this.http
            .post<CourseRegistrationResponse>(url, data)
            .pipe(catchError(this.apiService.handleError<CourseRegistrationResponse>('', {
                success: false,
                bad_request: true
            })));
    }

    registerVerify(courseId: number, data: CourseRegistrationRequest): Observable<CourseRegistrationResponse> {
        const url = this.apiService.getURL('course', courseId, 'verify');
        return this.http
            .post<CourseRegistrationResponse>(url, data)
            .pipe(catchError(this.apiService.handleError<CourseRegistrationResponse>(``, {
                success: false,
                bad_request: true
            })));
    }

    getCourseRegistrationStatus(courseId: number): Observable<RegistrationStatus> {
        const url = this.apiService.getURL('course', courseId, 'get-registration-status');
        return this.http
            .get<RegistrationStatus>(url)
            .pipe(catchError(this.apiService.handleError<RegistrationStatus>(``)));
    }

    validateEvent(courseId: number, eventId: number, needsToBeRegistered = true): Observable<APIResponse> {
        const url = this.apiService.getURL('course', courseId, 'validate-event', eventId);
        const params = this.apiService.addParams({'registered': String(needsToBeRegistered)});
        return this.http
            .get<APIResponse>(url,params)
            .pipe(catchError(this.apiService.handleError<APIResponse>(``, {success: false, bad_request: true})));
    }

    /**
     * Retrieve all courses with their info
     * @param registered - Filter retrieved courses by if this user is registered in them or not
     * @param options - Object of options for this request
     */
    getCourses(registered = false, options?: {
        filters?: unknown,
        ordering?: unknown,
        page?: number,
        pageSize?: number
    }): Observable<Course[]> {
        const {filters = {}, ordering = {}, page = 1, pageSize = 50} = options ? options : {};
        const searchParams = {'registered': String(registered), 'page': String(page), 'pageSize': String(pageSize)};
        for (const field of Object.keys(filters)) {
            searchParams[field] = String(filters[field]);
        }
        const orderingFields = [];
        for (const field of Object.keys(ordering)) {
            if (ordering[field]) {
                orderingFields.push(`${field}`);
            } else {
                orderingFields.push(`-${field}`);
            }
        }
        if (orderingFields.length > 0) {
            searchParams['ordering'] = String(orderingFields.join());
        }
        const url = this.apiService.getURL('course');
        const params = this.apiService.addParams(searchParams);
        return this.http
            .get<Course[]>(url, params)
            .pipe(catchError(this.apiService.handleError<Course[]>(``)));
    }


    /**
     * Retrieve a specific course with it's info
     * @param courseId - Corresponds to the id of the course, NOT the course_id field
     * @param registered - Filter retrieved courses by if this user is registered in them or not
     * @param options - Object of options for this request
     */
    getCourse(courseId: number, registered = false, options?: { filters: unknown }): Observable<Course> {
        const {filters = {}} = options ? options : {};
        const searchParams = {'registered': String(registered)};
        for (const field of Object.keys(filters)) {
            searchParams[field] = String(filters[field]);
        }
        const url = this.apiService.getURL('course', courseId);
        const params = this.apiService.addParams(searchParams);
        return this.http
            .get<Course>(url, params)
            .pipe(catchError(this.apiService.handleError<Course>(``)));
    }
}
