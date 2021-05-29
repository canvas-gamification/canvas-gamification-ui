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
        old_password: string,
        password: string,
        password2: string
    }): Observable<APIResponse> {
        const url = this.apiService.getURL('reset-password');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>(``, {success: false, bad_request: true})));
    }
}
