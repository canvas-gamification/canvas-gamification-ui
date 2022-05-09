import {AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Category, FilterParameters, Question} from '@app/_models';
import {QuestionService} from '@app/problems/_services/question.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {CategoryService} from "@app/_services/api/category.service";
import {Difficulty} from "@app/_models/difficulty";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {ProblemSetForm} from "@app/problems/_forms/problem-set.form";
import {TuiDialogContext, TuiDialogService, TuiNotification, TuiNotificationsService} from "@taiga-ui/core";
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {TuiComparator} from "@taiga-ui/addon-table";

export type SortingKey =
    'id'
    | 'title'
    | 'author_name'
    | 'event_name'
    | 'parent_category_name'
    | 'category_name'
    | 'difficulty';

@Component({
    selector: 'app-problem-set',
    templateUrl: './problem-set.component.html',
    styleUrls: ['./problem-set.component.scss'],
})
export class ProblemSetComponent implements OnInit, AfterContentChecked {
    formGroup: FormGroup;
    questions: Question[] = [];
    questionsTableColumns: string[] = [
        'id', 'title', 'author_name', 'event_name', 'parent_category_name', 'category_name',
        'difficulty', 'type_name', 'token_value', 'success_rate', 'status', 'actions'
    ];
    openNewQuestionDropdown = false;

    // Sorting
    readonly sorters: Record<SortingKey, TuiComparator<Question>> = {
        id: () => 0,
        title: () => 0,
        author_name: () => 0,
        event_name: () => 0,
        parent_category_name: () => 0,
        category_name: () => 0,
        difficulty: () => 0
    };
    sorter = this.sorters.id;
    sortDirection: -1 | 1 = 1;

    // Pagination
    numberOfQuestions = 0;
    pageSize = 10;
    page = 0;

    // Filtering
    paramChanged: Subject<FilterParameters> = new Subject<FilterParameters>();
    filteringQuestions = false;
    filterCategories: string[] = ['id', 'title', 'author', 'event__name', 'category__parent__name', 'category__name', 'difficulty'];
    categories: Category[];
    parentCategories: Category[];
    subCategories: Category[];
    difficulties: Difficulty[];

    constructor(private builder: FormBuilder,
                private questionService: QuestionService,
                private categoryService: CategoryService,
                private difficultyService: DifficultyService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
                @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
                private changeDetector: ChangeDetectorRef) {
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.questionService.getQuestions(options).subscribe(paginatedQuestions => {
                this.questions = paginatedQuestions.results.map(questions => {
                    return {...questions, actions: ''};
                });
                this.numberOfQuestions = paginatedQuestions.count;
                this.filteringQuestions = false;
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
        this.difficultyService.getDifficulties().subscribe((difficulties) => {
            this.difficulties = difficulties;
        });
        this.form['parentCategory'].valueChanges.subscribe((value) => {
            const parentCategoryPK = this.categories?.filter(c => c.name === value)[0].pk;
            this.subCategories = this.categories?.filter(c => c.parent === parentCategoryPK);
        });
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    /**
     * Get questions for problem-set.
     */
    initialize(): void {
        this.questionService.getQuestions().subscribe(paginatedQuestions => {
            this.numberOfQuestions = paginatedQuestions.count;
            this.questions = paginatedQuestions.results;
        });
    }

    /**
     * Update the current view of the problem-set.
     */
    update(): void {
        this.filteringQuestions = true;
        this.paramChanged.next(this.getOptions());
    }


    /**
     * Get the options required for the questions get request
     */
    getOptions(): FilterParameters {
        return {
            ...this.getFilterQueryString(),
            page: this.page + 1,
            page_size: this.pageSize,
            ordering: this.getOrdering(),
        };
    }

    /**
     * Takes the current direction and sorter name and gets the order
     */
    getOrdering(): string {
        const filterCategory = this.filterCategories[this.questionsTableColumns.indexOf(this.sorter.name)];
        return (this.sortDirection === -1 ? '-' : '') + filterCategory;
    }

    /**
     * Apply the filters to the problem-set.
     */
    getFilterQueryString(): { search: string, parentCategory: string, subCategory: string, difficulty: string, is_sample: string } {
        const formValues = this.formGroup.value;
        Object.keys(formValues).forEach(key => {
            if (!formValues[key]) {
                formValues[key] = '';
            }
        });
        return formValues;
    }

    /**
     * Delete a question from the problem-set.
     */
    deleteQuestion(questionId: number): void {
        this.questionService.deleteQuestion(questionId)
            .subscribe(() => {
                this.notificationsService
                    .show('The Question has been Deleted Successfully.', {
                        status: TuiNotification.Success
                    }).subscribe();
                this.update();
            });
    }

    /**
     * Dialog for confirming if you want to delete a question.
     * @param content - The modal to open.
     * @param questionId - The question to delete.
     */
    openDeleteQuestionDialog(content: PolymorpheusContent<TuiDialogContext>, questionId: number): void {
        this.dialogService.open(content, {
            closeable: false,
            label: 'Delete Question?'
        }).subscribe({
            next: () => this.deleteQuestion(questionId)
        });
    }
}
