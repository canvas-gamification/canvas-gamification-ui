import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserConsent} from '@app/_models/user_consent';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class ConsentService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    postConsent(input: {
        consent: boolean,
        legal_first_name: string,
        legal_last_name: string,
        student_number: string,
        date: string
    }): Observable<UserConsent> {
        const url = this.apiService.getURL('user-consent');
        return this.http
            .post<UserConsent>(url, input)
            .pipe(catchError(this.apiService.handleError<UserConsent>()));
    }

    getConsent(): Observable<UserConsent[]> {
        const url = this.apiService.getURL('user-consent');
        return this.http.get<UserConsent[]>(url)
            .pipe(catchError(this.apiService.handleError<UserConsent[]>()));
    }
}
