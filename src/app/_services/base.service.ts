import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {Observable, of} from "rxjs";
import {MESSAGE_TYPES} from "@app/_models";
import {MessageService} from "@app/_services/message.service";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(private messageService: MessageService) {
    }

    // Usage: this.baseService.addParams(this.baseService.getURL('course','edit','2'), {'param1':'1','param2':'false'});
    addParams(url: URL, params?: Record<string, string>): string {
        const searchParams = new URLSearchParams(params).toString() + '/';
        return url + '?' + searchParams;

    }

    getURL(...names: (string | number)[]): URL {
        let relativeURL = '';
        for (const id in names) {
            relativeURL += String(names[id]).split('/').join('') + '/';
        }
        return new URL(relativeURL, environment.apiBaseUrl + '/api/');
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param result - optional value to return as the observable result
     * @param message - optional message to pass if there is an error
     */
    handleError<T>(message = 'An Unexpected Error Occurred', result?: T): any {
        message = message.length > 0 ? message : 'An Unexpected Error Occurred';
        return (error: unknown): Observable<T> => {
            console.error(error); // log to console
            this.messageService.add(MESSAGE_TYPES.DANGER, message); // add message
            return of(result as T);
        };
    }
}
