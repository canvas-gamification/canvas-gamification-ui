import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ApiService} from "@app/_services/api.service";
import {APIResponse} from "@app/_models";
import {EmailFormData, PasswordFormData} from "@app/accounts/_forms/reset-password.form";

@Injectable({
    providedIn: null
})
export class ResetPasswordService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    putPasswordReset(input: PasswordFormData): Observable<APIResponse> {
        const url = this.apiService.getURL('reset-password');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleFormError()));
    }

    sendForgotPasswordEmail(input: EmailFormData): Observable<APIResponse> {
        const url = this.apiService.getURL('reset-password', 'send-email');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleFormError()));
    }
}
