import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionServiceUrl = new URL('/api/questions', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient) {
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionServiceUrl);
  }
}
