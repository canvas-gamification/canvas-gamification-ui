import {Component, OnInit} from '@angular/core';
import {UQJ} from '@app/_models/uqj';
import {UqjService} from '@app/_services/api/uqj.service';
import {Question} from "@app/_models";

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
            .getUQJs({recent: true, pageSize: 5})
            ?.subscribe((paginatedUqjs) => {
                this.uqjs = paginatedUqjs.results;
            });
    }

    formatQuestion(question: Question): string {
        return `${question.title} (${question.id})`;
    }

}
