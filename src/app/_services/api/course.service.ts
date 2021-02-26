import {Injectable} from '@angular/core';
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

  /**
   * Retrieve all courses with their info
   * @param registered - Filter retrieved courses by if this user is registered in them or not
   * @param options - Object of options for this request
   */
  getCourses(registered = false, options?: any): Observable<Course[]> {
    const {filters = {}, ordering = {}, page = 1, page_size = 50} = options ? options : {};
    let params = new HttpParams()
      .set('registered', String(registered))
      .set('page', page)
      .set('page_size', page_size);

    for (const field of Object.keys(filters)) {
      params = params.set(`${field}`, String(filters[field]));
    }

    const orderingFields = [];
    for (const field of Object.keys(ordering)) {
      if (ordering[field]) {
        orderingFields.push(`${field}`);
      } else {
        orderingFields.push(`-${field}`);
      }
    }
    params = params.set(`ordering`, `${orderingFields.join()}`);

    return this.http
      .get<Course[]>(this.courseUrl, {params})
      .pipe(
        catchError(
          this.handleError<Course[]>(
            `getCourses`
          )
        )
      );
  }


  /**
   * Retrieve a specific course with it's info
   * @param courseId - Corresponds to the id of the course, NOT the course_id field
   * @param registered - Filter retrieved courses by if this user is registered in them or not
   * @param options - Object of options for this request
   */
  getCourse(courseId: number, registered = false, options?: any): Observable<Course> {
    const {filters = {}} = options ? options : {};
    let params = new HttpParams()
      .set('registered', String(registered));

    for (const field of Object.keys(filters)) {
      params = params.set(`${field}`, String(filters[field]));
    }

    const url = `${this.courseUrl}/${courseId}`;
    return this.http
      .get<Course>(url, {params})
      .pipe(
        catchError(
          this.handleError<Course>(
            `getCourse`
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
