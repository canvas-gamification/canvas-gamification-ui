import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ApiService} from "@app/_services/api.service";
import {APIResponse} from "@app/_models";
import {ChangePasswordFormData} from "@app/accounts/_forms/change-password.form";

@Injectable({
    providedIn: null
})
export class ChangePasswordService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    putPasswordReset(input: ChangePasswordFormData): Observable<APIResponse> {
        const url = this.apiService.getURL('change-password');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleFormError()));
    }
}
