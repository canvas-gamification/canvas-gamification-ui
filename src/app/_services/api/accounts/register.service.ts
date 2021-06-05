import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ApiService} from "@app/_services/api.service";
import {APIResponse} from "@app/_models";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    postRegistration(input: {
        email: string,
        password: string,
        password2: string,
        recaptcha_key: string
    }): Observable<APIResponse> {
        const url = this.apiService.getURL('register');
        return this.http.post<APIResponse>(url, input)
            .pipe(catchError(this.apiService.handleError<APIResponse>(`A problem occurred while registering`,
                {success: false, bad_request: true})));
    }

    postActivation(uuid: string, token: string): Observable<APIResponse> {
        const url = this.apiService.getURL('register', 'activate');
        return this.http.post<APIResponse>(url, {uuid, token})
            .pipe(catchError(this.apiService.handleError<APIResponse>(`There was an error during activation`,
                {success: false, bad_request: true},
                {redirect: ['accounts', 'login']})));
    }
}
