import {Component, OnInit} from '@angular/core';
import {faEye, faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Question} from '@app/_models';
import {QuestionService} from '@app/_services/api/question.service';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';

@Component({
    selector: 'app-problem-set',
    templateUrl: './problem-set.component.html',
    styleUrls: ['./problem-set.component.scss']
})
export class ProblemSetComponent implements OnInit {
    FormData: FormGroup;
    faEye = faEye;
    faPencilAlt = faPencilAlt;
    faTrashAlt = faTrashAlt;
    questions: Question[];

    // Pagination
    questionsLength: number;
    pageSize: number;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageEvent: PageEvent;

    // Sorting
    sortedData: Question[];

    // Filtering
    filterQueryString;

    constructor(private builder: FormBuilder, private questionService: QuestionService) {
    }

    ngOnInit(): void {
        this.initialize();

        this.FormData = this.builder.group({
            query: new FormControl(''),
            difficulty: new FormControl(''),
            category: new FormControl(''),
            // status: new FormControl(''),
            is_sample: new FormControl('')
        });
    }

    initialize(): void {
        this.questionService.getQuestions().subscribe(paginatedQuestions => {
            this.questionsLength = paginatedQuestions.count;
            this.pageSize = paginatedQuestions.results.length;
            this.questions = paginatedQuestions.results;
            this.sortedData = this.questions.slice();
        });
    }

    newPageEvent(event): void {
        this.pageEvent = event;
        this.update();
    }

    update(): void {
        let options: {};
        if (this.pageEvent) {
            options = {
                page: this.pageEvent.pageIndex + 1,
                page_size: this.pageEvent.pageSize,
                search: this.filterQueryString.search,
                difficulty: this.filterQueryString.difficulty,
                category: this.filterQueryString.category,
                is_sample: this.filterQueryString.is_sample
            };
        } else {
            options = {
                search: this.filterQueryString.search,
                difficulty: this.filterQueryString.difficulty,
                category: this.filterQueryString.category,
                is_sample: this.filterQueryString.is_sample
            };
        }
        this.questionService.getQuestions(options).subscribe(paginatedQuestions => {
            this.questions = paginatedQuestions.results;
        });
    }

    sortData(sort: Sort) {
        const data = this.questions.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }
        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'id':
                    return compare(a.id, b.id, isAsc);
                case 'title':
                    return compare(a.title, b.title, isAsc);
                case 'author_name':
                    return compare(a.author_name, b.author_name, isAsc);
                case 'event_name':
                    return compare(a.event_name, b.event_name, isAsc);
                case 'parent_category_name':
                    return compare(a.parent_category_name, b.parent_category_name, isAsc);
                case 'category_name':
                    return compare(a.category_name, b.category_name, isAsc);
                case 'difficulty':
                    return compare(a.difficulty, b.difficulty, isAsc);
                case 'token_value':
                    return compare(a.token_value, b.token_value, isAsc);
                case 'success_rate':
                    return compare(a.success_rate, b.success_rate, isAsc);
                default:
                    return 0;
            }
        });
        this.questions = this.sortedData;
    }

    applyFilter(FormData) {
        this.filterQueryString = FormData;
        this.update();
    }

    highlight(status: string) {
        if (status.localeCompare('Solved') === 0){
            return 'highlight-success';
        }
        else if (status.localeCompare('Partially Solved') === 0){
            return 'highlight-warning';
        }
        else if (status.localeCompare('Wrong') === 0){
            return 'highlight-danger';
        }
        return '';
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

