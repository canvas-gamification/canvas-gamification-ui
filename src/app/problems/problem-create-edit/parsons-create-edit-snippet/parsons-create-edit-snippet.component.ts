import {Component, Inject, Input, OnInit} from '@angular/core'
import {AbstractControl, FormGroup} from '@angular/forms'
import {QuestionService} from '@app/problems/_services/question.service'
import {ParsonsForm} from "@app/problems/_forms/parsons.form"
import {Router} from "@angular/router"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {Question} from "@app/_models"

@Component({
    selector: 'app-parsons-create-snippet',
    templateUrl: './parsons-create-edit-snippet.component.html',
    styleUrls: ['./parsons-create-edit-snippet.component.scss'],
})
export class ParsonsCreateEditSnippetComponent implements OnInit {
    @Input() questionDetails: Question
    formGroup: FormGroup

    constructor(
        private questionService: QuestionService,
        private router: Router,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
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
            this.formGroup = ParsonsForm.createForm()
        }
    }

    onSubmit(): void {
        const submissionRequest = this.formGroup.getRawValue()
        if (this.questionDetails) {
            this.questionService.putParsonsQuestion(submissionRequest, this.questionDetails.id)
                .subscribe(() => {
                    this.notificationsService
                        .show('The question has been updated successfully.', {
                            status: TuiNotification.Success
                        }).subscribe()
                    this.refreshPage()
                })
        } else {
            this.questionService.postParsonsQuestion(submissionRequest)
                .subscribe(() => {
                    this.notificationsService
                        .show('The question has been created successfully.', {
                            status: TuiNotification.Success
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
