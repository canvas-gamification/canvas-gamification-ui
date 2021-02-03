import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Course} from '@app/_models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl = new URL(
    '/api/course',
    environment.apiBaseUrl
  ).toString();

  constructor(private http: HttpClient) {
  }

  getCourses(options?): Observable<Course[]> {
    const {active = false, registered = false} = options ? options : {};
    const params = new HttpParams()
      .set('active', active)
      .set('registered', registered);

    return this.http
      .get<Course[]>(this.courseUrl, {params})
      .pipe(
        catchError(
          this.handleError<Course[]>(
            `getAllUserCourse`
          )
        )
      );
  }

  getCourse(courseId: number, options?): Observable<Course> {
    const {active = false, registered = false} = options ? options : {};
    const params = new HttpParams()
      .set('active', active)
      .set('registered', registered);

    const url = `${this.courseUrl}/${courseId}`;
    return this.http
      .get<Course>(url, {params})
      .pipe(
        catchError(
          this.handleError<Course>(
            `getUserCourse`
          )
        )
      );
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
