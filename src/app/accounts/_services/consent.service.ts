import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserConsent} from '@app/_models/user_consent';
import {ApiService} from "@app/_services/api.service";
import {ConsentFormData} from "@app/accounts/_forms/consent.form";

@Injectable({
    providedIn: 'root'
})
export class ConsentService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    postConsent(input: ConsentFormData): Observable<UserConsent> {
        const url = this.apiService.getURL('user-consent');
        return this.http
            .post<UserConsent>(url, input)
            .pipe(catchError(this.apiService.handleFormError()));
    }

    getConsent(): Observable<UserConsent[]> {
        const url = this.apiService.getURL('user-consent');
        return this.http.get<UserConsent[]>(url)
            .pipe(catchError(this.apiService.handleError<UserConsent[]>()));
    }

    declineConsent(): Observable<UserConsent> {
        return this.postConsent({
            consent: false,
            legal_first_name: '-',
            legal_last_name: '-',
            student_number: '-',
            date: new Date().toDateString(),
        });
    }
}
