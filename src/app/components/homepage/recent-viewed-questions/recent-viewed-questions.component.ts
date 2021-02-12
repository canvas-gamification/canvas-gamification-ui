import {Component, OnInit} from '@angular/core';
import {UQJ} from '@app/_models/uqj';
import {UqjService} from '@app/_services/api/uqj.service';

@Component({
  selector: 'app-recent-viewed-questions',
  templateUrl: './recent-viewed-questions.component.html',
  styleUrls: ['./recent-viewed-questions.component.scss']
})
export class RecentViewedQuestionsComponent implements OnInit {
  uqjs: UQJ[];

  constructor(
    private uqjService: UqjService,
  ) {
  }

  ngOnInit(): void {
    this.uqjService
      .getUQJs({recent: true, page_size: 5})
      ?.subscribe((paginatedUqjs) => {
        this.uqjs = paginatedUqjs.results;
      });
  }

  formatQuestion(question): string {
    return `${question.title} (${question.id})`;
  }

}
