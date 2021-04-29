import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryStatsService} from '@app/_services/api/admin/category-stats.service';
import {QuestionCountService} from '@app/_services/api/admin/question-count.service';
import {QuestionCount} from '@app/_models/question_counts';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    headers = ['A', 'B'];
    data = [
        [5, 'C'],
        [3, 'A'],
        [10, 'B']
    ];

    questionHeaders = ['Question Type', 'Number of Questions', 'Attempts', 'Correct', 'Success Rate'];
    questionData: object[][];

    questionAPIData: QuestionCount[];

    constructor(public categoryStatsService: CategoryStatsService,
                public questionCountService: QuestionCountService) {
    }

    ngOnInit(): void {
        this.questionData = [['Pizza', 3, 5, 3, 3 / 5]];
        this.questionCountService
            .getQuestionCounts()
            .subscribe((questionCounts) => {
            this.questionAPIData = questionCounts;
        });
    }

    printData(): void{
        console.log(this.questionAPIData);
    }

}
