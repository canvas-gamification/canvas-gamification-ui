import {TuiNotificationService} from "@taiga-ui/core"
import {Component, EventEmitter, Inject, Input, OnChanges, Output, ChangeDetectionStrategy} from '@angular/core'
import {UQJ} from '@app/_models'
import {SubmissionService} from '@app/problems/_services/submission.service'

@Component({
    selector: 'app-java-view-snippet',
    templateUrl: './java-view-snippet.component.html',
    styleUrls: ['./java-view-snippet.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class JavaViewSnippetComponent implements OnChanges {
    activeTabIndex = 0
    @Input() uqj: UQJ
    @Output() readonly successfulSubmissionEvent = new EventEmitter<boolean>()
    inputFileNames = new Array<{ name: string, template: string }>()
    waitingSubmission = false

    constructor(
        private submissionService: SubmissionService,
        @Inject(TuiNotificationService) private readonly notificationsService: TuiNotificationService
    ) {
    }

    ngOnChanges(): void {
        this.inputFileNames = this.uqj.input_files.filter(val => !val.hidden)
    }

    canSubmit(): boolean {
        return this.uqj?.question?.max_submission_allowed - this.uqj?.num_attempts > 0
    }

    /**
     * Submit an answer to the question.
     */
    onSubmit(): void {
        this.waitingSubmission = true
        const codeSolution = {}
        this.inputFileNames.forEach(file => {
            codeSolution[file.name] = file.template
        })
        this.submissionService.postQuestionSubmission({
            question: this.uqj.question.id,
            solution: codeSolution
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
