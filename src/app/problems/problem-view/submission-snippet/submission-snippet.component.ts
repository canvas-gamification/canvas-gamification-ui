import {Component, Inject, Injector, Input, OnInit} from '@angular/core';
import {QuestionSubmission} from '@app/_models/question_submission';
import {DomSanitizer} from "@angular/platform-browser";
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {SubmissionViewComponent} from '@app/problems/submission-view/submission-view.component';

@Component({
    selector: 'app-submission-snippet',
    templateUrl: './submission-snippet.component.html',
    styleUrls: ['./submission-snippet.component.scss']
})
export class SubmissionSnippetComponent implements OnInit {
    @Input() previousSubmissions: QuestionSubmission[];

    constructor(
        private sanitizer: DomSanitizer,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector
    ) {
    }

    ngOnInit(): void {
        this.previousSubmissions.forEach((previousSubmission) => {
            previousSubmission.safeAnswer = [];
            previousSubmission.answer_display?.forEach((answer) => {
                previousSubmission.safeAnswer.push(this.sanitizer.bypassSecurityTrustHtml(answer));
            });
        });
    }

    openSubmissionDialog(submission: QuestionSubmission, index: number) {
        this.dialogService.open<number>(
            new PolymorpheusComponent(SubmissionViewComponent, this.injector),
            {
                data: submission,
                closeable: false,
                label: `Submission ${index}`
            }
        ).subscribe();
    }
}
