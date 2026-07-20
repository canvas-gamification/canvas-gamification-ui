import {TuiNotificationService} from "@taiga-ui/core"
import {Component, Inject, Input, OnInit, ChangeDetectionStrategy} from '@angular/core'
import {AbstractControl, UntypedFormControl, UntypedFormGroup} from '@angular/forms'
import {QuestionService} from '@app/problems/_services/question.service'
import {ParsonsForm} from "@app/problems/_forms/parsons.form"
import {Router} from "@angular/router"
import {Question} from "@app/_models"

@Component({
    selector: 'app-parsons-create-snippet',
    templateUrl: './parsons-create-edit-snippet.component.html',
    styleUrls: ['./parsons-create-edit-snippet.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ParsonsCreateEditSnippetComponent implements OnInit {
    @Input() questionDetails: Question
    @Input() eventId: number
    @Input() courseId: number
    formGroup: UntypedFormGroup
    variationControl : UntypedFormControl

    constructor(
        private questionService: QuestionService,
        private router: Router,
        @Inject(TuiNotificationService)
        private readonly notificationsService: TuiNotificationService
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
            this.formGroup = ParsonsForm.createFormWithData(this.questionDetails)
        } else {
            this.formGroup = ParsonsForm.createForm(this.courseId, this.eventId)
        }
        this.variationControl = this.formGroup.get('variation_types') as UntypedFormControl
    }

    onSubmit(): void {
        const submissionRequest = this.formGroup.getRawValue()
        if (this.questionDetails) {
            this.questionService.putParsonsQuestion(submissionRequest, this.questionDetails.id)
                .subscribe(() => {
                    this.notificationsService
                        .open('The question has been updated successfully.', {
                            appearance: 'success'
                        }).subscribe()
                    this.refreshPage()
                })
        } else {
            this.questionService.postParsonsQuestion(submissionRequest)
                .subscribe(() => {
                    this.notificationsService
                        .open('The question has been created successfully.', {
                            appearance: 'success'
                        }).subscribe()
                    this.refreshPage()
                })
        }
    }

    refreshPage(): void {
        const currentUrl = this.router.url
        this.router.onSameUrlNavigation = 'reload'
        this.router.navigate([currentUrl]).then(() => {
            window.scroll(0, 0)
        })
    }
}
