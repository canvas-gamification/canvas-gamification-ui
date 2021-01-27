import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../message.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {MultipleChoiceQuestion} from '../../_models/multiple_choice_question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private sampleMultipleChoiceQuestionsUrl = new URL('/api/sample-multiple-choice-question', environment.apiBaseUrl).toString();

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getSampleMultipleChoiceQuestions(): Observable<MultipleChoiceQuestion[]> {
    return this.http.get<MultipleChoiceQuestion[]>(this.sampleMultipleChoiceQuestionsUrl);
  }
}
