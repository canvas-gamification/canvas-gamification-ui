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
import {BaseService} from "@app/_services/base.service";

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(private http: HttpClient,
                private baseService: BaseService) {
    }

    getUserStats(courseId: number, categoryId: number): Observable<{ success_rate: number }> {
        return this.http
            .get<{ success_rate: number }>(this.baseService.addParams(this.baseService.getURL('course', courseId, 'user-stats', categoryId)))
            .pipe(catchError(this.baseService.handleError<{ success_rate: number }>('')));
    }

    register(courseId: number, data: CourseRegistrationRequest): Observable<CourseRegistrationResponse> {
        return this.http
            .post<CourseRegistrationResponse>(this.baseService.addParams(this.baseService.getURL('course', courseId, 'register')), data)
            .pipe(catchError(this.baseService.handleError<CourseRegistrationResponse>('', {
                success: false,
                bad_request: true
            })));
    }

    registerVerify(courseId: number, data: CourseRegistrationRequest): Observable<CourseRegistrationResponse> {
        return this.http
            .post<CourseRegistrationResponse>(this.baseService.addParams(this.baseService.getURL('course', courseId, 'verify')), data)
            .pipe(catchError(this.baseService.handleError<CourseRegistrationResponse>(``, {
                success: false,
                bad_request: true
            })));
    }

    getCourseRegistrationStatus(courseId: number): Observable<RegistrationStatus> {
        return this.http
            .get<RegistrationStatus>(this.baseService.addParams(this.baseService.getURL('course', courseId, 'get-registration-status')))
            .pipe(catchError(this.baseService.handleError<RegistrationStatus>(``)));
    }

    validateEvent(courseId: number, eventId: number, needsToBeRegistered = true): Observable<APIResponse> {
        return this.http
            .get<APIResponse>(this.baseService.addParams(this.baseService.getURL('course', courseId, 'validate-event', eventId),
                {'registered': String(needsToBeRegistered)}))
            .pipe(catchError(this.baseService.handleError<APIResponse>(``, {success: false, bad_request: true})));
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
        const params = {'registered': String(registered), 'page': String(page), 'pageSize': String(pageSize)};
        for (const field of Object.keys(filters)) {
            params[field] = String(filters[field]);
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
            params['ordering'] = String(orderingFields.join());
        }
        return this.http
            .get<Course[]>(this.baseService.addParams(this.baseService.getURL('course'), params))
            .pipe(catchError(this.baseService.handleError<Course[]>(``)));
    }


    /**
     * Retrieve a specific course with it's info
     * @param courseId - Corresponds to the id of the course, NOT the course_id field
     * @param registered - Filter retrieved courses by if this user is registered in them or not
     * @param options - Object of options for this request
     */
    getCourse(courseId: number, registered = false, options?: { filters: unknown }): Observable<Course> {
        const {filters = {}} = options ? options : {};
        const params = {'registered': String(registered)};
        for (const field of Object.keys(filters)) {
            params[field] = String(filters[field]);
        }
        return this.http
            .get<Course>(this.baseService.addParams(this.baseService.getURL('course', courseId), params))
            .pipe(catchError(this.baseService.handleError<Course>(``)));
    }
}
