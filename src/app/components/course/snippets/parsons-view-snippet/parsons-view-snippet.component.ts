import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-parsons-view-snippet',
  templateUrl: './parsons-view-snippet.component.html',
  styleUrls: ['./parsons-view-snippet.component.scss']
})
export class ParsonsViewSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    @Input() ParsonsQuestionDetails;
    @Input() parsonLines;
    @Input() parsonAnswerLines;
    @Input() PARSONS_LINES;
    @Input() variables;
    @Input() previousSubmissions;

  constructor() { }

  ngOnInit(): void {
  }

}
