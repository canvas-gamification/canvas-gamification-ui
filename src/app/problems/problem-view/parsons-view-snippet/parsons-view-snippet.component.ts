import {TuiNotificationService} from "@taiga-ui/core"
import {Component, EventEmitter, Inject, Input, OnChanges, Output, ChangeDetectionStrategy} from '@angular/core'
import {ParsonsFile, UQJ} from '@app/_models'
import {SubmissionService} from '@app/problems/_services/submission.service'

@Component({
    selector: 'app-parsons-view-snippet',
    templateUrl: './parsons-view-snippet.component.html',
    styleUrls: ['./parsons-view-snippet.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ParsonsViewSnippetComponent implements OnChanges {
    @Input() uqj: UQJ
    @Output() readonly successfulSubmissionEvent = new EventEmitter<boolean>()
    files: (ParsonsFile & { solution: string })[]
    waitingSubmission = false

    constructor(
        private submissionService: SubmissionService,
        @Inject(TuiNotificationService) private readonly notificationsService: TuiNotificationService
    ) {
    }

    ngOnChanges(): void {
        this.files = this.uqj.rendered_lines.map(file => ({
            ...file,
            solution: '',
        }))
    }

    canSubmit(): boolean {
        return this.uqj?.question?.max_submission_allowed - this.uqj?.num_attempts > 0
    }

    /**
     * Submit an answer to the question.
     */
    onSubmit(): void {
        this.waitingSubmission = true
        const solution = {}
        for (const file of this.files) {
            solution[file.name] = file.solution
        }
        this.submissionService.postQuestionSubmission({
            question: this.uqj.question.id,
            solution: solution,
        }).subscribe(() => {
            this.notificationsService
                .open('The question has been submitted successfully.', {
                    appearance: 'success'
                }).subscribe()
            this.successfulSubmissionEvent.emit(true)
            this.waitingSubmission = false
        }, () => {
            this.waitingSubmission = false
        })
    }
}
