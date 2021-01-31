import {Component, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {MultipleChoiceQuestion} from '@app/_models';

@Component({
  selector: 'app-sample-questions',
  templateUrl: './sample-questions.component.html',
  styleUrls: ['./sample-questions.component.scss']
})
export class SampleQuestionsComponent implements OnInit {

  multipleChoiceQuestions: MultipleChoiceQuestion[];

  constructor(private questionService: QuestionService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.questionService.getSampleMultipleChoiceQuestions().subscribe(questions => this.multipleChoiceQuestions = questions);
  }

}
