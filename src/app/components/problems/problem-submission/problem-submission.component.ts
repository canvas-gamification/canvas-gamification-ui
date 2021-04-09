import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-problem-submission',
  templateUrl: './problem-submission.component.html',
  styleUrls: ['./problem-submission.component.scss']
})
export class ProblemSubmissionComponent implements OnInit {
    private routeSub: Subscription;
    questionId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.routeSub = this.route.params.subscribe(params => {
          this.questionId = params.id;
      });
  }

}
