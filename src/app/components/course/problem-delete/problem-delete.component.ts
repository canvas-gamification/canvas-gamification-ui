import {Component, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-problem-delete',
  templateUrl: './problem-delete.component.html',
  styleUrls: ['./problem-delete.component.scss']
})
export class ProblemDeleteComponent implements OnInit {
  private routeSub: Subscription;
  userId: number;

  constructor(private questionService: QuestionService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params.id;
    });
    this.questionService.deleteQuestion(this.userId)
      .subscribe(response => {
        this.messageService.addSuccess('The Question has been Deleted Successfully.');
        this.router.navigate(['../../'], {relativeTo: this.route});
        console.log(response);
      }, error => {
        console.warn(error.responseText);
        console.log({error});
        this.router.navigate(['../../problem-set'], {relativeTo: this.route});
      });
  }

}
