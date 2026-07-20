import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {ApiService} from "@app/_services/api.service"
import {Observable} from "rxjs"
import {QuestionCount} from "@app/_models"
import {catchError} from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class QuestionCountService {

    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {
    }

    getQuestionCount(): Observable<QuestionCount[]> {
        const url = this.apiService.getURL('admin/question-count')
        return this.http
            .get<QuestionCount[]>(url)
            .pipe(catchError(this.apiService.handleError<QuestionCount[]>('Unable to get question counts', [])))
    }
}
