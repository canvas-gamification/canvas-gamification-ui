import { Injectable } from "@angular/core";
import { Category } from "../../models/category";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { MessageService } from "../message.service";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private categoriesUrl = "api/categories"; // URL to fake api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.categoriesUrl)
      .pipe(catchError(this.handleError<Category[]>("getCategories", [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
