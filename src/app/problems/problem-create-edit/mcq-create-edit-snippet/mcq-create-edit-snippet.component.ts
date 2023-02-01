import {Component, Inject, Input, OnInit} from '@angular/core'
import {QuestionService} from '@app/problems/_services/question.service'
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms'
import {McqForm} from "@app/problems/_forms/mcq.form"
import {Router} from "@angular/router"
import {
    TuiDialogContext,
    TuiDialogService,
    TuiNotification,
    TuiNotificationsService
} from "@taiga-ui/core"
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus"
import {Question} from '@app/_models'

@Component({
    selector: 'app-mcq-create-snippet',
    templateUrl: './mcq-create-edit-snippet.component.html',
    styleUrls: ['./mcq-create-edit-snippet.component.scss'],
})
export class McqCreateEditSnippetComponent implements OnInit {
    @Input() questionDetails: Question
    @Input() isCheckbox: boolean
    @Input() eventId: number
    @Input() courseId: number
    formGroup: FormGroup

    constructor(
        private questionService: QuestionService,
        private router: Router,
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService,
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
    }

    checkCheckboxAnswersDialog(content: PolymorpheusContent<TuiDialogContext>): void {
        if (this.form.answer.value.length <= 1) {
            this.dialogService.open(content, {
                closeable: false,
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
                        .show('The question has been updated successfully.', {
                            status: TuiNotification.Success
                        }).subscribe()
                    this.refreshPage()
                })
        } else {
            this.questionService.postMultipleChoiceQuestion(submissionData)
                .subscribe(() => {
                    this.notificationsService
                        .show('The question has been created successfully.', {
                            status: TuiNotification.Success
                        }).subscribe()
                    this.refreshPage()
                })
        }
    }

    getAnswerFormControls(): FormControl[] {
        return (this.form.answer as FormArray).controls as FormControl[]
    }

    getAnswers(): FormArray {
        return this.form.answer as FormArray
    }

    addAnswer(): void {
        this.getAnswers()?.push(McqForm.createChoiceControl())
    }

    removeAnswer(index: number): void {
        this.getAnswers()?.removeAt(index)
    }

    getDistractors(): FormArray {
        return this.form.choices as FormArray
    }

    getDistractorFormControls(): FormControl[] {
        return this.getDistractors().controls as FormControl[]
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
