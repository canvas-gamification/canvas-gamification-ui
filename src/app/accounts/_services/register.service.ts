import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ApiService} from "@app/_services/api.service";
import {APIResponse, User} from "@app/_models";
import {RegisterFormData} from "@app/accounts/_forms/register.form";

@Injectable({
    providedIn: null
})
export class RegisterService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    postRegistration(input: RegisterFormData): Observable<User> {
        const url = this.apiService.getURL('register');
        return this.http.post<User>(url, input).pipe(catchError(this.apiService.handleFormError()));
    }

    postActivation(uuid: string, token: string): Observable<APIResponse> {
        const url = this.apiService.getURL('register', 'activate');
        return this.http.post<APIResponse>(url, {uuid, token})
            .pipe(catchError(this.apiService.handleError<APIResponse>(`There was an error during activation`,
                {success: false, bad_request: true},
                {redirect: ['accounts', 'login']})));
    }
}
