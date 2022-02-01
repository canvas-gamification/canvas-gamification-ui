import {Component, Inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/problems/_services/question.service';
import {JavaForm} from "@app/problems/_forms/java.form";
import {Router} from "@angular/router";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";
import {Question} from "@app/_models";

@Component({
    selector: 'app-java-create-snippet',
    templateUrl: './java-create-edit-snippet.component.html',
    styleUrls: ['./java-create-edit-snippet.component.scss'],
})
export class JavaCreateEditSnippetComponent implements OnInit {
    @Input() questionDetails: Question;
    formGroup: FormGroup;

    constructor(private questionService: QuestionService,
                private router: Router,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    ngOnInit(): void {
        if (this.questionDetails) {
            this.formGroup = JavaForm.createFormWithData(this.questionDetails);
        } else {
            this.formGroup = JavaForm.createForm();
        }
    }

    /**
     * Form submission.
     */
    onSubmit(): void {
        const submissionRequest = this.formGroup.getRawValue();
        if (this.questionDetails) {
            this.questionService.putJavaQuestion(submissionRequest, this.questionDetails.id)
                .subscribe(() => {
                    this.notificationsService
                        .show('The Question has been Updated Successfully.', {
                            status: TuiNotification.Success
                        }).subscribe();
                    this.refreshPage();
                });
        } else {
            this.questionService.postJavaQuestion(submissionRequest)
                .subscribe(() => {
                    this.notificationsService
                        .show('The Question has been Created Successfully.', {
                            status: TuiNotification.Success
                        }).subscribe();
                    this.refreshPage();
                });
        }
    }

    refreshPage(): void {
        const currentUrl = this.router.url;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]).then(() => {
            window.scroll(0, 0);
        });
    }
}
