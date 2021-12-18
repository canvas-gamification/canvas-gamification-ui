import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserStatsService} from '@app/_services/api/user-stats.service';
import {CategoryService} from '@app/_services/api/category.service';
import {Category} from '@app/_models';
import {forkJoin} from 'rxjs';
import {CourseService} from '@app/course/_services/course.service';
import {TuiDialogContext} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

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
                private categoryService: CategoryService,
                private changeDetector: ChangeDetectorRef,
                @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<number, number>) {
        this.categoryId = this.context.data[0];
        this.courseId = this.context.data[1];
    }

    ngOnInit(): void {
        const userStatsObservable = this.courseService.getUserStats(this.courseId, this.categoryId);
        const categoryObservable = this.categoryService.getCategory(this.categoryId);
        forkJoin([userStatsObservable, categoryObservable]).subscribe(result => {
            this.category = result[1];
            this.userSuccessRate = result[0].success_rate;
            this.changeDetector.detectChanges();
        });
    }

    closeDialog(): void {
        this.context.completeWith(0);
    }
}
