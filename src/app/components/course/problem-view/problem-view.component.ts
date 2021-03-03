import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/_services/api/question.service';
import {Subscription} from 'rxjs';
import {Question} from '@app/_models';

@Component({
  selector: 'app-problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.scss']
})
export class ProblemViewComponent implements OnInit {
  private routeSub: Subscription;
  userId: number;
  QuestionDetails: Question;
  choices: Array<any>;

  constructor(private route: ActivatedRoute, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params.id;
    });
    this.questionService.getQuestion(this.userId).subscribe((details: Question) => {
      this.QuestionDetails = details;
    });
  }

}
