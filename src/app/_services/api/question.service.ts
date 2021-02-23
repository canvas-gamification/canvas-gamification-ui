import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '@app/_models';
import {PaginatedResult} from '@app/_models/paginatedResult';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionServiceUrl = new URL('/api/questions', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient) {
  }

  getQuestions(options?): Observable<PaginatedResult<Question>> {
    const {page = 1, page_size = 50} = options ? options : {};
    const params = new HttpParams()
      .set('page', page)
      .set('page_size', page_size);

    return this.http.get<PaginatedResult<Question>>(this.questionServiceUrl, {params});
  }
}
