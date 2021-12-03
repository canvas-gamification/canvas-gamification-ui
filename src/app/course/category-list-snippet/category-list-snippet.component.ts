import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '@app/_services/api/category.service';
import {SubmissionService} from "@app/problems/_services/submission.service";
import {Category, Question} from '@app/_models';
import {QuestionSubmission} from '@app/_models/question_submission';
import {MatTableDataSource} from "@angular/material/table";
import {Sort} from "@angular/material/sort";
import {Subject} from "rxjs";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {QuestionService} from "@app/problems/_services/question.service";

@Component({
    selector: 'app-category-list-snippet',
    templateUrl: './category-list-snippet.component.html',
    styleUrls: ['./category-list-snippet.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class CategoryListSnippetComponent implements OnInit {
    @Input() categoryList: [{
        categories: string,
    }];

    categoriesList: Category[];
    categoriesSource : MatTableDataSource<Category>;
    submissionsList: QuestionSubmission[];
    questionsList: Question[];
    expanded: unknown = {};
    displayedColumns: string[] = ['pk', 'name', 'parent', 'total'];
    expandedElement: Category | null;
    expandedChildrenElement: Category | null;

    // Sorting
    ordering: string;
    //Filtering
    filterQueryString;
    paramChanged: Subject<{
        ordering: string
    }> = new Subject<{
        ordering: string
    }>();

    constructor(private categoryService: CategoryService,
                private submissionService: SubmissionService,
                private questionService: QuestionService) {
    }

    ngOnInit(): void {
        this.categoryService
            .getCategories()
            .subscribe((categories) => {
                this.categoriesList = categories;
                this.categoriesSource = new MatTableDataSource(this.categoriesList);
            });
        this.submissionService.getAllSubmission().subscribe(
            submissions => {
                this.submissionsList = submissions;
            }
        );
        this.questionService.getQuestions().subscribe(paginatedQuestions => {
            this.questionsList = paginatedQuestions.results;
        });
    }

    /**
     * Update the current view of the course-dashboard.
     */
    update(): void {
        const options = {
            ...this.filterQueryString,
            ordering: this.ordering,
        };
        this.paramChanged.next(options);
    }

    /**
     * Helper method for sorting the canvascourseregistration objects.
     * @param sort - The current sort state.
     */
    sortData(sort: Sort): void {
        if (sort.direction === 'asc') {
            this.ordering = sort.active;
        } else if (sort.direction === 'desc') {
            this.ordering = '-' + sort.active;
        } else {
            this.ordering = '';
        }
        this.update();
    }

    getSubmissionStat(id: number): number {
        let counter = 0;
        this.submissionsList.forEach(sub => {
            if (sub.question.category == id){
                counter += 1;
            }
        });
        return counter;
    }

    getMaxAttemptsStat(id: number): number {
        let counter = 0;
        this.questionsList.forEach(question => {
            if (question.category == id){
                counter += question.max_submission_allowed;
            }
        });
        return counter;
    }
}
