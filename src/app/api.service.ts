import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../models/question';
import {environment} from '../environments/environment';
import {MessageService} from './services/message.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private problemSetURL = new URL('/api/problem-set', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.messageService.add(this.problemSetURL);
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.problemSetURL);
  }
}
