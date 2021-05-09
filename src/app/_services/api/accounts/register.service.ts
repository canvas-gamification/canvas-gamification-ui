import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private registrationUrl = new URL('/api/register/', environment.apiBaseUrl).toJSON();
    private activationUrl = new URL('/api/register/activate/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    postRegistration(input: unknown) : Observable<string> {
        return this.http.post(this.registrationUrl, input, {responseType: 'text'}).pipe(
            map(
                (response) => {
                    if (response) {
                        return response;
                    }
                },
                (error: never) => {
                    return error;
                }
            )
        );
    }

    postActivation(uuid: string, token: string) : Observable<string> {
        return this.http.post(this.activationUrl, {uuid, token}, {responseType: 'text'}).pipe(
            map(
                (response) => {
                    if (response) {
                        return response;
                    }
                },
                (error: never) => {
                    return error;
                }
            )
        );
    }
}
