import {Component, EventEmitter, Inject, Input, OnChanges, Output} from '@angular/core';
import {ParsonsFile, UQJ} from '@app/_models';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

@Component({
    selector: 'app-parsons-view-snippet',
    templateUrl: './parsons-view-snippet.component.html',
    styleUrls: ['./parsons-view-snippet.component.scss'],
})
export class ParsonsViewSnippetComponent implements OnChanges {
    @Input() uqj: UQJ;
    @Output() readonly successfulSubmissionEvent = new EventEmitter<boolean>();
    files: (ParsonsFile & { solution: string })[];
    waitingSubmission = false;

    constructor(private submissionService: SubmissionService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    ngOnChanges(): void {
        this.files = this.uqj.rendered_lines.map(file => ({
            ...file,
            solution: '',
        }));
    }

    canSubmit(): boolean {
        return this.uqj?.question?.max_submission_allowed - this.uqj?.num_attempts > 0;
    }

    /**
     * Submit an answer to the question.
     */
    onSubmit(): void {
        this.waitingSubmission = true;
        const solution = {};
        for (const file of this.files) {
            solution[file.name] = file.solution;
        }
        this.submissionService.postQuestionSubmission({
            question: this.uqj.question.id,
            solution: solution,
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
