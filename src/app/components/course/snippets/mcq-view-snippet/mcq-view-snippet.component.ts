import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {QuestionSubmission} from '@app/_models/questionSubmission';
import {MessageService} from '@app/_services/message.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-mcq-view-snippet',
  templateUrl: './mcq-view-snippet.component.html',
  styleUrls: ['./mcq-view-snippet.component.scss']
})
export class McqViewSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    previousSubmissions: QuestionSubmission[];
    variables: any[];
    choiceArray: any[];

  constructor(private questionService: QuestionService,
              private messageService: MessageService) { }

  ngOnInit(): void {
      const previousSubmissionsObservble = this.questionService.getPreviousSubmissions(this.QuestionDetails.id);
      forkJoin([previousSubmissionsObservble])
          .subscribe(result => {
              this.previousSubmissions = result[0];
          });
      const outputArray = [];
      // tslint:disable-next-line:forin
      for (const choice in this.QuestionDetails.choices) {
          outputArray.push({
              id: choice,
              value: this.QuestionDetails.choices[choice]
          });
          this.choiceArray = outputArray;
      }
  }

}
