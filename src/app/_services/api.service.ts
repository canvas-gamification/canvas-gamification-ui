import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {Observable, of} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private router: Router,
        private toastr: ToastrService) {
    }

    getURL(...names: (string | number)[]): string {
        let relativeURL = '/api';
        for (const i in names) {
            relativeURL = Location.joinWithSlash(relativeURL, names[i].toString())
        }
        relativeURL = Location.joinWithSlash(relativeURL, '/')
        return new URL(relativeURL, environment.apiBaseUrl).toString();
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param result - optional value to return as the observable result
     * @param message - optional message to pass if there is an error
     */
    handleError<T>(message = 'An Unexpected Error Occurred', result?: T): (error) => Observable<T> {
        message = message.length > 0 ? message : 'An Unexpected Error Occurred';
        return (error): Observable<T> => {
            if (error.localeCompare('Not Found', undefined, {sensitivity: 'base'}) === 0)
                this.router.navigate(['/404']).then();
            else if (error.localeCompare('Forbidden', undefined, {sensitivity: 'base'}) === 0)
                this.router.navigate(['/403']).then();

            this.toastr.error(message);
            return of(result as T);
        };
    }
}
