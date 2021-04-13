import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserStatsService} from '@app/_services/api/user-stats.service';
import {CategoryService} from '@app/_services/api/category.service';
import {Category} from '@app/_models';
import {forkJoin} from 'rxjs';
import {CourseService} from '@app/_services/api/course/course.service';

@Component({
    selector: 'app-user-stats',
    templateUrl: './user-stats.component.html',
    styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {
    categoryId: number;
    category: Category;
    courseId: number;
    userSuccessRate: number;

    constructor(private route: ActivatedRoute,
                private userStatsService: UserStatsService,
                private courseService: CourseService,
                private categoryService: CategoryService) {
        this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
        this.courseId = +this.route.snapshot.paramMap.get('courseId');
    }

    ngOnInit(): void {
        const userStatsObservable = this.courseService.getUserStats(this.courseId, this.categoryId);
        const categoryObservable = this.categoryService.getCategory(this.categoryId);
        forkJoin([userStatsObservable, categoryObservable]).subscribe(result => {
            this.category = result[1];
            this.userSuccessRate = result[0].success_rate;
        });
    }

}
