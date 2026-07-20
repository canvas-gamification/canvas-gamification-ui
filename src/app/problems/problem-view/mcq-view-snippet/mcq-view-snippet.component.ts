import {Component, EventEmitter, Inject, Input, OnChanges, Output} from '@angular/core'
import {UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms'
import {UQJ} from '@app/_models'
import {SubmissionService} from '@app/problems/_services/submission.service'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'
import { TuiNotification, TuiAlertService } from '@taiga-ui/core'

@Component({
    selector: 'app-mcq-view-snippet',
    templateUrl: './mcq-view-snippet.component.html',
    styleUrls: ['./mcq-view-snippet.component.scss'],
})
export class McqViewSnippetComponent implements OnChanges {
    @Input() uqj: UQJ
    @Output() readonly successfulSubmissionEvent = new EventEmitter<boolean>()
    formData: UntypedFormGroup
    checkboxFormData: UntypedFormGroup
    choiceArray: { id: string, value: string, safeValue: SafeHtml }[]
    checkboxAnswers: string[]
    waitingSubmission = false

    constructor(
        private submissionService: SubmissionService,
        private formBuilder: UntypedFormBuilder,
        private sanitizer: DomSanitizer,
        @Inject(TuiAlertService) private readonly notificationsService: TuiAlertService
    ) {
    }

    /**
     * Get the checkbox form controls as a FormArray.
     */
    get checkboxesArray(): UntypedFormArray {
        return this.checkboxFormData.controls.solutions as UntypedFormArray
    }

    ngOnChanges(): void {
        const outputArray = []
        for (const choice in this.uqj.rendered_choices) {
            outputArray.push({
                id: choice,
                value: this.uqj.rendered_choices[choice],
                safeValue: this.sanitizer.bypassSecurityTrustHtml(this.uqj.rendered_choices[choice])
            })
            this.choiceArray = outputArray
        }
        if (!this.uqj.is_checkbox) {
            this.formData = this.formBuilder.group({
                question: new UntypedFormControl(this.uqj.question.id),
                solution: new UntypedFormControl(null, [Validators.required])
            })
        } else {
            this.checkboxAnswers = []
            this.checkboxFormData = this.formBuilder.group({
                question: new UntypedFormControl(this.uqj.question.id),
                solutions: new UntypedFormArray(this.choiceArray.map(() => new UntypedFormControl(false)))
            })
            this.checkboxFormData.controls.solutions.valueChanges.subscribe((answers) => {
                this.checkboxAnswers = answers.map((answer, index) => {
                    if (answer) return this.choiceArray[index].id
                }).filter(id => id !== undefined)
            })
        }
    }

    canSubmit(): boolean {
        return this.uqj?.question?.max_submission_allowed - this.uqj?.num_attempts > 0
    }

    /**
     * Submit an answer to the question.
     */
    onSubmit(formData: { question: number, solution: unknown }): void {
        this.waitingSubmission = true
        this.submissionService.postQuestionSubmission(formData).subscribe(() => {
            this.notificationsService
                .open('The question has been submitted successfully.', {
                    status: TuiNotification.Success
                }).subscribe()
            this.successfulSubmissionEvent.emit(true)
            this.waitingSubmission = false
        }, () => {
            this.waitingSubmission = false
        })
    }

    /**
     * Submit an answer for a checkbox question.
     */
    onCheckboxSubmit(): void {
        this.waitingSubmission = true
        this.submissionService.postQuestionSubmission({
            question: this.checkboxFormData.value.question,
            solution: this.checkboxAnswers.sort().toString()
        }).subscribe(() => {
            this.notificationsService
                .open('The question has been submitted successfully.', {
                    status: TuiNotification.Success
                }).subscribe()
            this.successfulSubmissionEvent.emit(true)
            this.waitingSubmission = false
        }, () => {
            this.waitingSubmission = false
        })
    }
}
