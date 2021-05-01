import {Component, OnInit} from '@angular/core';
import {QuestionCount} from '@app/_models/question_counts';
import {CategoryStats} from '@app/_models/category_stats';
import {AdminService} from '@app/_services/api/admin.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    questionData: QuestionCount[];
    categoryData: CategoryStats[];

    constructor(private adminService: AdminService) {
    }

    ngOnInit(): void {
        this.adminService
            .getQuestionCounts()
            .subscribe((questionCounts) => {
                this.questionData = questionCounts;
            });
        this.adminService
            .getCategoryStats()
            .subscribe((categoryStats) => {
                this.categoryData = categoryStats;
            });
    }
}
