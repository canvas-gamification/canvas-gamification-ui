import {
    Component,
    EventEmitter,
    Inject,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Output,
    ChangeDetectionStrategy
} from '@angular/core'
import {QuestionSubmission} from '@app/_models/question_submission'
import {DomSanitizer} from "@angular/platform-browser"
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent, PolymorpheusContent} from '@taiga-ui/polymorpheus'
import {SubmissionViewComponent} from '@app/problems/submission-view/submission-view.component'
import {SubmissionService} from "@app/problems/_services/submission.service"
import {map} from "rxjs/operators"
import {Observable, Subscriber} from "rxjs"

@Component({
    selector: 'app-submission-snippet',
    templateUrl: './submission-snippet.component.html',
    styleUrls: ['./submission-snippet.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SubmissionSnippetComponent implements OnChanges, OnInit {

    @Input() questionId: number
    @Output() readonly reloadRequestSubscriberEvent = new EventEmitter<Subscriber<void>>()

    reloadRequestObservable: Observable<void>
    reloadRequestSubscriber: Subscriber<void>

    previousSubmissions: QuestionSubmission[]

    constructor(
        private sanitizer: DomSanitizer,
        private submissionService: SubmissionService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
    ) {
    }

    ngOnInit(): void {
        this.reloadRequestObservable = new Observable<void>(
            subscriber => this.reloadRequestSubscriber = subscriber
        )
        this.reloadRequestObservable.subscribe(() => this.reloadSubmissions())
        this.reloadRequestSubscriberEvent.emit(this.reloadRequestSubscriber)
    }

    ngOnChanges(): void {
        this.reloadSubmissions()
    }

    reloadSubmissions(): void {
        this.submissionService.getPreviousSubmissions(
            this.questionId,
            {ordering: '-submission_time'},
        )
            .pipe(map(submissions => submissions.map(submission => ({
                ...submission,
                safeAnswer: [this.sanitizer.bypassSecurityTrustHtml(
                    (submission.question.type_name === 'multiple choice question') ?
                        submission.answer_display.toString() : ""
                )]
            }))))
            .subscribe(submissions => {
                this.previousSubmissions = submissions
                if (submissions.some(submission => submission.status === "Evaluating")) {
                    setTimeout(() => this.reloadRequestSubscriber.next(), 5000)
                }
            })
    }

    openSubmissionDialog(submission: QuestionSubmission, index: number) {
        this.dialogService.open<number>(
            new PolymorpheusComponent(SubmissionViewComponent, this.injector),
            {
                size: 'l',
                data: submission,
                closable: false,
                label: `Submission ${index}`
            }
        ).subscribe()
    }

    openMCQSubmissionDialog(content: PolymorpheusContent<TuiDialogContext>, index: number): void {
        this.dialogService.open(content, {
            closable: false,
            label: `Submission ${index}`
        }).subscribe()
    }

    submissionAppropriateSize(submission: QuestionSubmission): boolean {
        return submission.safeAnswer.toString().length < 500 &&
            submission.safeAnswer.toString().indexOf('image') === -1
    }
}
