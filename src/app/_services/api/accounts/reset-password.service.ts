import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    private resetPasswordUrl = new URL('/api/reset-password/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    putPasswordReset(input: {
        old_password: string,
        password: string,
        password2: string
    }): Observable<string> {
        return this.http.post(this.resetPasswordUrl, input, {responseType: 'text'}).pipe(
            map(
                (response) => {
                    if (response) {
                        return response;
                    }
                },
                (error: unknown) => {
                    return error;
                }
            )
        );
    }
}
