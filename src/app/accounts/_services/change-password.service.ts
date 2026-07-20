import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaderResponse} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import {Observable} from "rxjs"
import {ApiService} from "@app/_services/api.service"
import {ChangePasswordFormData} from "@app/accounts/_forms/change-password.form"

@Injectable({
    providedIn: 'root'
})
export class ChangePasswordService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    /**
     * Send the request to reset password.
     * @param input - The change password form.
     */
    putPasswordReset(input: ChangePasswordFormData): Observable<HttpHeaderResponse> {
        const url = this.apiService.getURL('change-password')
        return this.http.post<HttpHeaderResponse>(url, input)
            .pipe(catchError(this.apiService.handleFormError()))
    }
}
