import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {Observable, of} from "rxjs";
import {MESSAGE_TYPES} from "@app/_models";
import {MessageService} from "@app/_services/message.service";
import {HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private messageService: MessageService, private router: Router) {
    }

    addParams(params?: Record<string, string>): { params: HttpParams } {
        return {params: new HttpParams(params)};
    }

    getURL(...names: (string | number)[]): string {
        let relativeURL = '';
        for (const id in names) {
            relativeURL += String(names[id]).split('/').join('') + '/';
        }
        return new URL(relativeURL, environment.apiBaseUrl + '/api/').toString();
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

            this.messageService.add(MESSAGE_TYPES.DANGER, message);
            return of(result as T);
        };
    }
}
