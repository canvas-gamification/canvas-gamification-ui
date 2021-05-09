import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthenticationService} from '@app/_services/api/authentication';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) {
    }

    intercept(request: HttpRequest<never>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(catchError((err: { status: number; statusText: string; error: {message: string}; }) => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['/accounts/login']).then();
            }
            if(err.status === 404){
                //redirect to 404 page
                this.router.navigate(['404']).then();
            }
            if(err.status === 403){
                //redirect to 403 page
                this.router.navigate(['403']).then();
            }

            const error: string = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
