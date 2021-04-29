import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryStatsService} from '@app/_services/api/admin/category-stats.service';
import {QuestionCountService} from '@app/_services/api/admin/question-count.service';
import {QuestionCount} from '@app/_models/question_counts';
import {CategoryStats} from '@app/_models/category_stats';
import {UserStatsService} from '@app/_services/api/user-stats.service';
import {UserStats} from '@app/_models';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    questionAPIData: QuestionCount[];
    categoryAPIData: CategoryStats[];
    userStatAPIData: UserStats[];

    constructor(private categoryStatsService: CategoryStatsService,
                private questionCountService: QuestionCountService,
                private userStatsService: UserStatsService) {
    }

    ngOnInit(): void {
        this.questionCountService
            .getQuestionCounts()
            .subscribe((questionCounts) => {
                this.questionAPIData = questionCounts;
            });
        this.categoryStatsService
            .getCategoryStats()
            .subscribe((categoryStats) => {
                this.categoryAPIData = categoryStats;
            });
        this.userStatsService
            .getAllUserStat()
            .subscribe((userStats) => {
                this.userStatAPIData = userStats;
            });
    }

    printData(): void {
        console.log(this.questionAPIData);
        console.log(this.categoryAPIData);
        console.log(this.userStatAPIData);
    }

}
