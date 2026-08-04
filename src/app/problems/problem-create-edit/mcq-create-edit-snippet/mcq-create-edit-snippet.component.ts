import {Component, Inject, Input, OnInit, ChangeDetectionStrategy} from '@angular/core'
import {QuestionService} from '@app/problems/_services/question.service'
import {AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from '@angular/forms'
import {McqForm} from "@app/problems/_forms/mcq.form"
import {Router} from "@angular/router"
import {TuiDialogContext, TuiDialogService, TuiNotificationService} from "@taiga-ui/core"
import {PolymorpheusContent} from "@taiga-ui/polymorpheus"
import {Question} from '@app/_models'

@Component({
    selector: 'app-mcq-create-snippet',
    templateUrl: './mcq-create-edit-snippet.component.html',
    styleUrls: ['./mcq-create-edit-snippet.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class McqCreateEditSnippetComponent implements OnInit {
    @Input() questionDetails: Question
    @Input() isCheckbox: boolean
    @Input() eventId: number
    @Input() courseId: number
    formGroup: UntypedFormGroup
    variationControl : UntypedFormControl

    constructor(
        private questionService: QuestionService,
        private router: Router,
        @Inject(TuiNotificationService)
        private readonly notificationsService: TuiNotificationService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
    ) {
    }

    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls
    }

    ngOnInit(): void {
        if (this.questionDetails) {
            this.formGroup = McqForm.createFormWithData(this.questionDetails)
            this.isCheckbox = this.questionDetails.is_checkbox
        } else {
            this.formGroup = McqForm.createForm(this.courseId, this.eventId)
            this.addDistractor()
            this.addAnswer()
        }
        this.variationControl = this.formGroup.get('variation_types') as UntypedFormControl
    }

    checkCheckboxAnswersDialog(content: PolymorpheusContent<TuiDialogContext>): void {
        if (this.form.answer.value.length <= 1) {
            this.dialogService.open(content, {
                closable: false,
                label: 'Submit Question?'
            }).subscribe({
                next: () => this.onSubmit()
            })
        } else {
            this.onSubmit()
        }
    }

    /**
     * Form submission.
     */
    onSubmit(): void {
        const submissionData = McqForm.submissionData(this.formGroup)
        if (this.questionDetails) {
            this.questionService.putMultipleChoiceQuestion(submissionData, this.questionDetails.id)
                .subscribe(() => {
                    this.notificationsService
                        .open('The question has been updated successfully.', {
                            appearance: 'success'
                        }).subscribe()
                    this.refreshPage()
                })
        } else {
            this.questionService.postMultipleChoiceQuestion(submissionData)
                .subscribe(() => {
                    this.notificationsService
                        .open('The question has been created successfully.', {
                            appearance: 'success'
                        }).subscribe()
                    this.refreshPage()
                })
        }
    }

    getAnswerFormControls(): UntypedFormControl[] {
        return (this.form.answer as UntypedFormArray).controls as UntypedFormControl[]
    }

    getAnswers(): UntypedFormArray {
        return this.form.answer as UntypedFormArray
    }

    addAnswer(): void {
        this.getAnswers()?.push(McqForm.createChoiceControl())
    }

    removeAnswer(index: number): void {
        this.getAnswers()?.removeAt(index)
    }

    getDistractors(): UntypedFormArray {
        return this.form.choices as UntypedFormArray
    }

    getDistractorFormControls(): UntypedFormControl[] {
        return this.getDistractors().controls as UntypedFormControl[]
    }

    addDistractor(): void {
        this.getDistractors()?.push(McqForm.createChoiceControl())
    }

    removeDistractor(index: number): void {
        this.getDistractors()?.removeAt(index)
    }

    refreshPage(): void {
        const currentUrl = this.router.url
        this.router.onSameUrlNavigation = 'reload'
        this.router.navigate([currentUrl]).then(() => {
            window.scroll(0, 0)
        })
    }
}
