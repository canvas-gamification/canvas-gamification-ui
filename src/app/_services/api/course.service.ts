import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CanvasCourse} from "@app/_models";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl = new URL('/api/course/', environment.apiBaseUrl).toString();

  constructor(
    private http: HttpClient,
  ) {
  }

  getCourses(userId : number): Observable<CanvasCourse[]> {
    const userHeaders = new HttpHeaders();
    userHeaders.append('user',''+userId);
    return this.http
      .get<CanvasCourse[]>(this.courseUrl,{headers: userHeaders})
      .pipe(catchError(this.handleError<CanvasCourse[]>('getCourses', [])));
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
