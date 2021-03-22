import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mcq-view-snippet',
  templateUrl: './mcq-view-snippet.component.html',
  styleUrls: ['./mcq-view-snippet.component.scss']
})
export class McqViewSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    @Input() MultipleChoiceQuestionDetails;
    @Input() choiceArray;
    @Input() variables;
    @Input() previousSubmissions;

  constructor() { }

  ngOnInit(): void {
  }

}
