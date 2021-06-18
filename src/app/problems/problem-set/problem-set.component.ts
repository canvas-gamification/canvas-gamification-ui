import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {faEye, faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Category, Question} from '@app/_models';
import {QuestionService} from '@app/problems/_services/question.service';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {ToastrService} from "ngx-toastr";
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatTableDataSource} from '@angular/material/table';
import {CategoryService} from "@app/_services/api/category.service";
import {Difficulty} from "@app/_models/difficulty";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {ProblemSetForm} from "@app/problems/_forms/problem-set.form";

@Component({
    selector: 'app-problem-set',
    templateUrl: './problem-set.component.html',
    styleUrls: ['./problem-set.component.scss'],
    providers: [QuestionService]
})
export class ProblemSetComponent implements OnInit {
    formGroup: FormGroup;
    faEye = faEye;
    faPencilAlt = faPencilAlt;
    faTrashAlt = faTrashAlt;
    questions: Question[];
    questionsSource: MatTableDataSource<Question>;

    // Pagination
    questionsLength: number;
    pageSize: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageEvent: PageEvent;

    // Sorting
    ordering: string;

    // Filtering
    filterQueryString;

    // Modal
    deleteQuestionId: number;

    paramChanged: Subject<{
        page: number,
        page_size: number,
        search: string,
        parentCategory: string,
        subCategory: string,
        difficulty: string,
        is_sample: string,
        ordering: string
    }> = new Subject<{
        page: number,
        page_size: number,
        search: string,
        parentCategory: string,
        subCategory: string,
        difficulty: string,
        is_sample: string,
        ordering: string
    }>();
    displayedColumns: string[] = ['id', 'title', 'author', 'event__name', 'category__parent__name', 'category__name',
        'difficulty', 'token_value', 'avg_success', 'actions'];
    categories: Category[];
    parentCategories: Category[];
    subCategories: Category[];
    difficulties: Difficulty[];

    constructor(private builder: FormBuilder,
                private questionService: QuestionService,
                private categoryService: CategoryService,
                private difficultyService: DifficultyService,
                private toastr: ToastrService,
                private modalService: NgbModal) {
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.questionService.getQuestions(options).subscribe(paginatedQuestions => {
                this.questions = paginatedQuestions.results;
                this.questionsSource = new MatTableDataSource<Question>(this.questions);
                this.questionsLength = paginatedQuestions.count;
            });
        });
    }

    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    ngOnInit(): void {
        this.initialize();
        this.formGroup = ProblemSetForm.createForm();
        this.categoryService.getCategories().subscribe((categories) => {
            this.parentCategories = categories.filter(c => c.parent == null);
            this.categories = categories;
        });
        this.difficultyService.getDifficulties().subscribe((difficulties) => this.difficulties = difficulties);
        this.form['parentCategory'].valueChanges.subscribe((value) => {
            const parentCategoryPK = this.categories.filter(c => c.name === value)[0].pk;
            this.subCategories = this.categories.filter(c => c.parent === parentCategoryPK);
        });
    }

    /**
     * Get questions for problem-set.
     */
    initialize(): void {
        this.questionService.getQuestions().subscribe(paginatedQuestions => {
            this.questionsLength = paginatedQuestions.count;
            this.pageSize = paginatedQuestions.results.length;
            this.questions = paginatedQuestions.results;
            this.questionsSource = new MatTableDataSource(this.questions);
        });
    }

    /**
     * New page for the problem-set.
     * @param event
     */
    newPageEvent(event: PageEvent): void {
        this.pageEvent = event;
        this.update();
    }

    /**
     * Update the current view of the problem-set.
     */
    update(): void {
        const options = {
            ...(this.pageEvent && {
                page: this.pageEvent.pageIndex + 1,
                page_size: this.pageEvent.pageSize,
            }),
            ...this.filterQueryString,
            ordering: this.ordering,
        };
        this.paramChanged.next(options);
    }

    /**
     * Helper method for sorting the questions.
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

    /**
     * Apply the filters to the problem-set.
     */
    applyFilter(): void {
        this.filterQueryString = this.formGroup.value;
        this.update();
    }

    /**
     * Delete a question from the problem-set.
     */
    deleteQuestion(): void {
        this.questionService.deleteQuestion(this.deleteQuestionId)
            .subscribe(() => {
                this.toastr.success('The Question has been Deleted Successfully.');
                this.update();
                window.scroll(0, 0);
            }, error => {
                this.toastr.error(error);
                console.warn(error);
                window.scroll(0, 0);
            });
    }

    /**
     * Highlight a row.
     * @param status
     */
    highlight(status: string): string {
        if (status.localeCompare('Solved') === 0) {
            return 'highlight-success';
        } else if (status.localeCompare('Partially Solved') === 0) {
            return 'highlight-warning';
        } else if (status.localeCompare('Wrong') === 0) {
            return 'highlight-danger';
        }
        return '';
    }

    /**
     * Modal for confirming if you want to delete a question.
     * @param content - The modal to open.
     * @param questionId - The question to delete.
     */
    open(content: unknown, questionId: number): void {
        this.deleteQuestionId = questionId;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
    }
}
