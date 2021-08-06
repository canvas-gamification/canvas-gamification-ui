import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ApiService} from "@app/_services/api.service";
import {User} from "@app/_models";
import {RegisterFormData} from "@app/accounts/_forms/register.form";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    postRegistration(input: RegisterFormData): Observable<User> {
        const url = this.apiService.getURL('register');
        return this.http.post<User>(url, input).pipe(catchError(this.apiService.handleFormError()));
    }

    postActivation(uuid: string, token: string): Observable<HttpResponse<unknown>> {
        const url = this.apiService.getURL('register', 'activate');
        return this.http.post<HttpResponse<unknown>>(url, {
            uuid,
            token
        }, {observe: 'response'}).pipe(catchError(this.apiService.handleFormError()));
    }
}
