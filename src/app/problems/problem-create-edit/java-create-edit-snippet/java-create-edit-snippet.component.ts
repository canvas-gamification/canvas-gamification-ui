import {Component, Inject, Input, OnInit, ChangeDetectionStrategy} from '@angular/core'
import {AbstractControl, UntypedFormControl, UntypedFormGroup} from '@angular/forms'
import {QuestionService} from '@app/problems/_services/question.service'
import {JavaForm} from "@app/problems/_forms/java.form"
import {Router} from "@angular/router"
import { TuiAlertService } from "@taiga-ui/core"
import {Question} from "@app/_models"

@Component({
    selector: 'app-java-create-snippet',
    templateUrl: './java-create-edit-snippet.component.html',
    styleUrls: ['./java-create-edit-snippet.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class JavaCreateEditSnippetComponent implements OnInit {
    @Input() questionDetails: Question
    @Input() eventId: number
    @Input() courseId: number
    formGroup: UntypedFormGroup
    variationControl : UntypedFormControl

    constructor(
        private questionService: QuestionService,
        private router: Router,
        @Inject(TuiAlertService)
        private readonly notificationsService: TuiAlertService
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
            this.formGroup = JavaForm.createFormWithData(this.questionDetails)
        } else {
            this.formGroup = JavaForm.createForm(this.courseId, this.eventId)
        }
        this.variationControl = this.formGroup.get('variation_types') as UntypedFormControl
    }

    /**
     * Form submission.
     */
    onSubmit(): void {
        const submissionRequest = this.formGroup.getRawValue()
        if (this.questionDetails) {
            this.questionService.putJavaQuestion(submissionRequest, this.questionDetails.id)
                .subscribe(() => {
                    this.notificationsService
                        .open('The question has been updated successfully.', {
                            appearance: 'success'
                        }).subscribe()
                    this.refreshPage()
                })
        } else {
            this.questionService.postJavaQuestion(submissionRequest)
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
