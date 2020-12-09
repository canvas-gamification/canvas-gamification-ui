import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/api/question.service';
import {MessageService} from '../../services/message.service';
import {MultipleChoiceQuestion} from '../../../models/multiple_choice_question';

@Component({
  selector: 'app-sample-questions',
  templateUrl: './sample-questions.component.html',
  styleUrls: ['./sample-questions.component.css']
})
export class SampleQuestionsComponent implements OnInit {

  multipleChoiceQuestions: MultipleChoiceQuestion[];

  constructor(private questionService: QuestionService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.questionService.getSampleMultipleChoiceQuestions().subscribe(questions => this.multipleChoiceQuestions = questions);
  }

}
