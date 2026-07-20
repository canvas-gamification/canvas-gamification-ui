import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {ApiService} from "@app/_services/api.service"
import {SurveyCheck} from "@app/_models/survey"

@Injectable({
    providedIn: 'root'
})
export class SurveyService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    postSurvey(code: string, response: unknown): Observable<unknown> {
        const url = this.apiService.getURL('survey')
        return this.http
            .post(url, {
                code,
                response,
            })
            .pipe(catchError(this.apiService.handleFormError()))
    }

    checkSurvey(): Observable<SurveyCheck> {
        const url = this.apiService.getURL('survey', 'check')
        return this.http.get<SurveyCheck>(url)
            .pipe(catchError(this.apiService.handleError<SurveyCheck>()))
    }
}
