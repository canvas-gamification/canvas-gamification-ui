import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
    APIResponse,
    Course,
    CourseRegistrationRequest,
    CourseRegistrationResponse, Question,
    RegistrationStatus, User,

} from '@app/_models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {QuestionReport} from "@app/_models/Question_Report";

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService) {
    }

    // TODO: Fix this when refactoring the concept-map
    // { success_rate: number } is not ok
    // handle the error properly
    getUserStats(courseId: number, categoryId: number): Observable<{ success_rate: number }> {
        const url = this.apiService.getURL('course', courseId, 'user-stats', categoryId);
        return this.http
            .get<{ success_rate: number }>(url)
            .pipe(catchError(this.apiService.handleError<{ success_rate: number }>()));
    }

    // TODO: Handling error of this function needs refactoring
    // Error message should be sent from here
    register(courseId: number, data: CourseRegistrationRequest): Observable<CourseRegistrationResponse> {
        const url = this.apiService.getURL('course', courseId, 'register');
        return this.http
            .post<CourseRegistrationResponse>(url, data)
            .pipe(catchError(this.apiService.handleError<CourseRegistrationResponse>('', {
                success: false,
                bad_request: true
            })));
    }

    // TODO: Handling error of this function needs refactoring
    // Error message should be sent from here
    registerVerify(courseId: number, data: CourseRegistrationRequest): Observable<CourseRegistrationResponse> {
        const url = this.apiService.getURL('course', courseId, 'verify');
        return this.http
            .post<CourseRegistrationResponse>(url, data)
            .pipe(catchError(this.apiService.handleError<CourseRegistrationResponse>(``, {
                success: false,
                bad_request: true
            })));
    }

    // TODO: Handling error of this function needs refactoring
    // Error message should be sent from here
    getCourseRegistrationStatus(courseId: number): Observable<RegistrationStatus> {
        const url = this.apiService.getURL('course', courseId, 'get-registration-status');
        return this.http
            .get<RegistrationStatus>(url)
            .pipe(catchError(this.apiService.handleError<RegistrationStatus>(``)));
    }

    // TODO: Handling error of this function needs refactoring
    // Error message should be sent from here
    validateEvent(courseId: number, eventId: number): Observable<APIResponse> {
        const url = this.apiService.getURL('course', courseId, 'validate-event', eventId);
        return this.http
            .get<APIResponse>(url)
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
        const url = this.apiService.getURL('course');
        let params = new HttpParams()
            .set('registered', String(registered))
            .set('page', String(page))
            .set('page_size', String(pageSize));

        for (const field of Object.keys(filters)) {
            params = params.set(`${field}`, String(filters[field]));
        }

        const orderingFields = [];
        for (const field of Object.keys(ordering)) {
            if (ordering[field]) {
                orderingFields.push(`${field}`);
            } else {
                orderingFields.push(`-${field}`);
            }
        }
        params = params.set(`ordering`, `${orderingFields.join()}`);

        return this.http
            .get<Course[]>(url, {params})
            .pipe(
                catchError(
                    this.apiService.handleError<Course[]>(`Unable to load courses.`, [])
                )
            );
    }


    /**
     * Retrieve a specific course with it's info
     * @param courseId - Corresponds to the id of the course, NOT the course_id field
     */
    getCourse(courseId: number): Observable<Course> {
        const url = this.apiService.getURL('course', courseId);
        return this.http
            .get<Course>(url)
            .pipe(catchError(this.apiService.handleError<Course>(`Unable to load course`, null)));
    }

    getReport(userId: number, questionId: number): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report','get-report');
        const params = new HttpParams()
            .set('question', String(questionId))
            .set('user', String(userId));
        return this.http
            .get<QuestionReport>(url,{params})
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while fetching a report')));
    }

    sendReport(data: {user: User, question: Question, report: string, report_details: string}): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report','add-report');
        return this.http
            .post<QuestionReport>(url, data)
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while creating a report')));
    }

    deleteReport(userId: number, questionId: number): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report','delete-report');
        const params = new HttpParams()
            .set('question', String(questionId))
            .set('user', String(userId));
        return this.http
            .delete<QuestionReport>(url,{params})
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while fetching a report')));
    }
}
