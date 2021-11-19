import {Inject, Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {Observable, of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {TuiNotification, TuiNotificationsService} from '@taiga-ui/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private router: Router,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    getURL(...names: (string | number)[]): string {
        let relativeURL = '/api';
        for (const i in names) {
            relativeURL = Location.joinWithSlash(relativeURL, String(names[i]));
        }
        relativeURL = Location.joinWithSlash(relativeURL, '/');
        return new URL(relativeURL, environment.apiBaseUrl).toString();
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param result - optional value to return as the observable result
     * @param message - optional message to pass if there is an error
     * @param options - options to modify the behaviour of handling error
     */
    handleError<T>(
        message?: string,
        result?: T,
        options?: {
            redirect403?: boolean,
            redirect404?: boolean,
            redirect?: (string | number)[]
            showMessage?: boolean
        }
    ): (error: HttpErrorResponse) => Observable<T> {
        const {redirect403 = false, redirect404 = false, redirect = [], showMessage = true} = options ? options : {};
        return (error): Observable<T> => {

            if (redirect404 && error.status === 404)
                this.router.navigate(['/404'], {skipLocationChange: true}).then();
            else if (redirect403 && error.status === 403)
                this.router.navigate(['/403'], {skipLocationChange: true}).then();
            else if (redirect)
                this.router.navigate(redirect).then();

            if (showMessage)
                this.notificationsService
                    .show(message || error.statusText, {
                        status: TuiNotification.Error
                    }).subscribe();
            if (!result) {
                return throwError(error);
            }
            return of(result as T);
        };
    }

    handleFormError(): (error: HttpErrorResponse) => Observable<never> {
        const toastErrorObject = (error: unknown): void => {
            if (typeof error === 'string') {
                this.notificationsService
                    .show(error, {
                        status: TuiNotification.Error
                    }).subscribe();
            } else if (Array.isArray(error)) {
                error.forEach(toastErrorObject);
            } else if (typeof error === 'object') {
                for (const key in error) {
                    if (error.hasOwnProperty(key))
                        toastErrorObject(error[key]);
                }
            }
        };

        return (error): Observable<never> => {
            const apiError = error.error;
            if (!apiError) {
                this.notificationsService
                    .show('Something went wrong!', {
                        status: TuiNotification.Error
                    }).subscribe();
            } else {
                toastErrorObject(apiError);
            }
            return throwError(error);
        };
    }
}
