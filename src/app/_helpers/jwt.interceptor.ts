import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@environments/environment';
import {AuthenticationService} from '@app/_services/api/authentication';
import {User} from '@app/_models';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser: User = this.authenticationService.currentUserValue;
        const isLoggedIn: string = currentUser && currentUser.token;
        const isApiUrl: boolean = request.url.startsWith(environment.apiBaseUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    authorization: `Token ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
