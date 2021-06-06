import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ApiService} from "@app/_services/api.service";
import {APIResponse} from "@app/_models";

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    putPasswordReset(input: {
        uid: string,
        token: string,
        password: string,
        password2: string
    }): Observable<APIResponse> {
        const url = this.apiService.getURL('reset-password');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>(`There was an error while changing your password`, {
                success: false,
                bad_request: true
            })));
    }

    sendForgotPasswordEmail(email: string): Observable<APIResponse> {
        const url = this.apiService.getURL('reset-password', 'send-email');
        return this.http.post<APIResponse>(url, {email})
            .pipe(catchError(this.apiService.handleError<APIResponse>(`There was an error while sending your reset email`, {
                success: false,
                bad_request: true
            })));

    }
}
