import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {Observable, of} from "rxjs";
import {MESSAGE_TYPES} from "@app/_models";
import {MessageService} from "@app/_services/message.service";
import {HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private messageService: MessageService) {
    }

    addParams(params?: Record<string, string>): {params : HttpParams} {
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
    handleError<T>(message = 'An Unexpected Error Occurred', result?: T): any {
        message = message.length > 0 ? message : 'An Unexpected Error Occurred';
        return (): Observable<T> => {
            this.messageService.add(MESSAGE_TYPES.DANGER, message);
            return of(result as T);
        };
    }
}
