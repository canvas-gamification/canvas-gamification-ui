import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {UQJ} from '@app/_models';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {TuiNotification, TuiNotificationsService} from '@taiga-ui/core';

@Component({
    selector: 'app-java-view-snippet',
    templateUrl: './java-view-snippet.component.html',
    styleUrls: ['./java-view-snippet.component.scss'],
})
export class JavaViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;
    @Output() readonly successfulSubmissionEvent = new EventEmitter<boolean>();
    inputFileNames = new Array<{ name: string, template: string }>();
    waitingSubmission = false;

    constructor(
        private submissionService: SubmissionService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    ngOnInit(): void {
        this.inputFileNames = this.uqj.input_files;
    }

    canSubmit(): boolean {
        return this.uqj?.question?.max_submission_allowed - this.uqj?.num_attempts > 0;
    }

    /**
     * Submit an answer to the question.
     */
    onSubmit(): void {
        this.waitingSubmission = true;
        const codeSolution = {};
        this.inputFileNames.forEach(file => {
            codeSolution[file.name] = file.template;
        });
        this.submissionService.postQuestionSubmission({
            question: this.uqj.question.id,
            solution: codeSolution
        }).subscribe(() => {
            this.notificationsService
                .show('The Question has been Submitted Successfully.', {
                    status: TuiNotification.Success
                }).subscribe();
            this.successfulSubmissionEvent.emit(true);
            this.waitingSubmission = false;
        }, () => {
            this.waitingSubmission = false;
        });
    }
}
