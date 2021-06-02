import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MultipleChoiceQuestion} from '@app/_models';
import {ApiService} from "@app/_services/api.service";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SampleQuestionService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getSampleMultipleChoiceQuestions(): Observable<MultipleChoiceQuestion[]> {
        const url = this.apiService.getURL('sample-multiple-choice-question');
        return this.http.get<MultipleChoiceQuestion[]>(url)
            .pipe(catchError(this.apiService.handleError<MultipleChoiceQuestion[]>('Error occurred while fetching sample questions')));
    }
}
