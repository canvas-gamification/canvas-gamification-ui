import {Component, Input, OnInit} from '@angular/core';
import {Question} from '@app/_models';
import {QuestionSubmission} from '@app/_models/questionSubmission';

@Component({
  selector: 'app-problem-view-snippet',
  templateUrl: './problem-view-snippet.component.html',
  styleUrls: ['./problem-view-snippet.component.scss']
})
export class ProblemViewSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    @Input() MultipleChoiceQuestionDetails;
    @Input() choiceArray;
    @Input() variables;
    @Input() previousSubmissions;

  constructor() { }

  ngOnInit(): void {
  }

}
