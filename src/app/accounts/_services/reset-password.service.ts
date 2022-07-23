import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaderResponse} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import {Observable} from "rxjs"
import {ApiService} from "@app/_services/api.service"
import {EmailFormData, PasswordFormData} from "@app/accounts/_forms/reset-password.form"

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    /**
     * Update password.
     * @param input - New password form data.
     */
    putPasswordReset(input: PasswordFormData): Observable<HttpHeaderResponse> {
        const url = this.apiService.getURL('reset-password')
        return this.http.post<HttpHeaderResponse>(url, input)
            .pipe(catchError(this.apiService.handleFormError()))
    }

    /**
     * Send an email with a reset password link.
     * @param input - Email form data.
     */
    sendForgotPasswordEmail(input: EmailFormData): Observable<HttpHeaderResponse> {
        const url = this.apiService.getURL('reset-password', 'send-email')
        return this.http.post<HttpHeaderResponse>(url, input)
            .pipe(catchError(this.apiService.handleFormError()))
    }
}
