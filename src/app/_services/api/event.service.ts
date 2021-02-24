import { Injectable } from '@angular/core';
import {Event} from '../../_models/event';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsUrl = new URL("/api/event/", environment.apiBaseUrl).toString();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getEvents(): Observable<Event[]> {
    return this.http
    .get<Event[]>(this.eventsUrl)
    .pipe(catchError(this.handleError<Event[]>('getEvent', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
