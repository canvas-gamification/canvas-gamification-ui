import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
    APIResponse,
    Course,
    CourseRegistrationRequest,
    CourseRegistrationResponse,
    RegistrationStatus, ReportQuestion
} from '@app/_models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class QuestionReportService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService) {
    }


}
