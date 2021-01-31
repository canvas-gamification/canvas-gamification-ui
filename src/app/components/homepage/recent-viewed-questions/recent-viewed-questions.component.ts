import {Component, OnInit} from '@angular/core';
import {UQJ} from '@app/_models/uqj';
import {UserUqjService} from '@app/_services/api/user-uqj.service';

@Component({
  selector: 'app-recent-viewed-questions',
  templateUrl: './recent-viewed-questions.component.html',
  styleUrls: ['./recent-viewed-questions.component.css']
})
export class RecentViewedQuestionsComponent implements OnInit {
  uqjs: UQJ[];

  constructor(
    private uqjService: UserUqjService,
  ) {
  }

  ngOnInit(): void {
    this.uqjService
      .getAllUserUQJ({recent: true})
      ?.subscribe((uqjs) => {
        this.uqjs = uqjs;
      });
  }

  formatQuestion(question): string {
    return `${question.title} (${question.id})`;
  }

}
