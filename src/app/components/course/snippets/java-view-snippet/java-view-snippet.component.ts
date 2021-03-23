import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {forkJoin} from 'rxjs';
import {QuestionSubmission} from '@app/_models/questionSubmission';

@Component({
  selector: 'app-java-view-snippet',
  templateUrl: './java-view-snippet.component.html',
  styleUrls: ['./java-view-snippet.component.scss']
})
export class JavaViewSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    previousSubmissions: QuestionSubmission[];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
      const previousSubmissionsObservble = this.questionService.getPreviousSubmissions(this.QuestionDetails.id);
      forkJoin([previousSubmissionsObservble])
          .subscribe(result => {
              this.previousSubmissions = result[0];
          });
  }

}
