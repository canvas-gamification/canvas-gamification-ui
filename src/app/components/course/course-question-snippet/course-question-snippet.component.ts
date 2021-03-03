import {Component, Input, OnInit} from '@angular/core';
import {Question} from '@app/_models';

@Component({
  selector: 'app-course-question-snippet',
  templateUrl: './course-question-snippet.component.html',
  styleUrls: ['./course-question-snippet.component.scss']
})
export class CourseQuestionSnippetComponent implements OnInit {
  @Input() questions: Question[];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.questions);
  }

}
