import {Component, OnInit} from '@angular/core';
import {faEye, faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MESSAGE_TYPES, Question} from '@app/_models';
import {QuestionService} from '@app/_services/api/question.service';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {MessageService} from '@app/_services/message.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
    ordering: string;

    // Filtering
    filterQueryString;

    // Modal
    deleteQuestionId: number;

    paramChanged: Subject<{}> = new Subject<{}>();

    constructor(private builder: FormBuilder,
                private questionService: QuestionService,
                private messageService: MessageService,
                private modalService: NgbModal) {
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.questionService.getQuestions(options).subscribe(paginatedQuestions => {
                this.questions = paginatedQuestions.results;
                this.questionsLength = paginatedQuestions.count;
            });
        });
    }

    ngOnInit(): void {
        this.initialize();

        this.FormData = this.builder.group({
            search: new FormControl(''),
            difficulty: new FormControl(''),
            category: new FormControl(''),
            // TODO: Add filtering by status
            // status: new FormControl(''),
            is_sample: new FormControl('')
        });
    }

    initialize(): void {
        this.questionService.getQuestions().subscribe(paginatedQuestions => {
            this.questionsLength = paginatedQuestions.count;
            this.pageSize = paginatedQuestions.results.length;
            this.questions = paginatedQuestions.results;
        });
    }

    newPageEvent(event): void {
        this.pageEvent = event;
        this.update();
    }

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

    sortData(sort: Sort) {
        if (sort.direction === 'asc') {
            this.ordering = sort.active;
        } else if (sort.direction === 'desc') {
            this.ordering = '-' + sort.active;
        } else {
            this.ordering = '';
        }
        this.update();
    }

    applyFilter() {
        this.filterQueryString = this.FormData.value;
        this.update();
    }

    deleteQuestion(): void {
        this.questionService.deleteQuestion(this.deleteQuestionId)
            .subscribe(response => {
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'The Question has been Deleted Successfully.');
                this.update();
                window.scroll(0, 0);
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                console.warn(error.responseText);
                window.scroll(0, 0);
            });
    }

    highlight(status: string) {
        if (status.localeCompare('Solved') === 0) {
            return 'highlight-success';
        } else if (status.localeCompare('Partially Solved') === 0) {
            return 'highlight-warning';
        } else if (status.localeCompare('Wrong') === 0) {
            return 'highlight-danger';
        }
        return '';
    }

    open(content, questionId) {
        this.deleteQuestionId = questionId;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
    }
}

