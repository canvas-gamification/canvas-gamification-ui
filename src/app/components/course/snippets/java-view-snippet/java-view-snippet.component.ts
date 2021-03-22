import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-java-view-snippet',
  templateUrl: './java-view-snippet.component.html',
  styleUrls: ['./java-view-snippet.component.scss']
})
export class JavaViewSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    @Input() JavaQuestionDetails;
    @Input() inputFileNames;
    @Input() variables;
    @Input() previousSubmissions;

  constructor() { }

  ngOnInit(): void {
  }

}
