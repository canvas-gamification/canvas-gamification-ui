import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UQJ} from '@app/_models';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";
import {SubmissionAnalyticsService} from "@app/course/_services/submission-analytics.service";

@Component({
    selector: 'app-mcq-view-snippet',
    templateUrl: './mcq-view-snippet.component.html',
    styleUrls: ['./mcq-view-snippet.component.scss'],
})
export class McqViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;
    formData: FormGroup;
    checkboxFormData: FormGroup;
    choiceArray: { id: string, value: string, safeValue: SafeHtml }[];
    checkboxAnswers: string[];

    constructor(private submissionService: SubmissionService,
                private submissionAnalyticsService: SubmissionAnalyticsService,
                private formBuilder: FormBuilder,
                private sanitizer: DomSanitizer,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    /**
     * Get the checkbox form controls as a FormArray.
     */
    get checkboxesArray(): FormArray {
        return this.checkboxFormData.controls.solutions as FormArray;
    }

    ngOnInit(): void {
        const outputArray = [];
        for (const choice in this.uqj.rendered_choices) {
            outputArray.push({
                id: choice,
                value: this.uqj.rendered_choices[choice],
                safeValue: this.sanitizer.bypassSecurityTrustHtml(this.uqj.rendered_choices[choice])
            });
            this.choiceArray = outputArray;
        }
        if (!this.uqj.is_checkbox) {
            this.formData = this.formBuilder.group({
                question: new FormControl(this.uqj.question.id),
                solution: new FormControl(null, [Validators.required]),
                time_spent: new FormControl(parseInt(localStorage.getItem(this.uqj.id.toString())))
            });
        } else {
            this.checkboxAnswers = [];
            this.checkboxFormData = this.formBuilder.group({
                question: new FormControl(this.uqj.question.id),
                solutions: new FormArray([])
            });
            this.addCheckboxesToForm();
        }
    }

    /**
     * Submit an answer to the question.
     */
    onSubmit(formData: { question: number, solution: unknown, time_spent: number}): void {
        this.submissionService.postQuestionSubmission({
            question: formData.question,
            solution: formData.solution,
            time_spent: parseInt(localStorage.getItem(this.uqj.id.toString()))
        })
            .subscribe(() => {
                this.notificationsService
                    .show('The Question has been Submitted Successfully.', {
                        status: TuiNotification.Success
                    }).subscribe();
                localStorage.removeItem(this.uqj.id.toString());
            });
        this.submissionAnalyticsService.initSubmissionAnalytics().subscribe();
    }

    /**
     * Submit an answer for a checkbox question.
     */
    onCheckboxSubmit(): void {
        this.submissionService.postQuestionSubmission({
            question: this.checkboxFormData.value.question,
            solution: this.checkboxAnswers.sort().toString(),
            time_spent: parseInt(localStorage.getItem(this.uqj.id.toString()))
        }).subscribe(() => {
            this.notificationsService
                .show('The Question has been Submitted Successfully.', {
                    status: TuiNotification.Success
                }).subscribe();
            localStorage.removeItem(this.uqj.id.toString());
        });
        this.submissionAnalyticsService.initSubmissionAnalytics();
    }

    /**
     * When the state of a checkbox changes (checked/!checked).
     * @param e - The event that is sent on change.
     */
    checkboxChanged(e: Event): void {
        const input = e.target as HTMLInputElement;
        if (input.checked) {
            this.checkboxAnswers.push(input.id);
        } else {
            this.checkboxAnswers.splice(this.checkboxAnswers.findIndex(id => id === input.id), 1);
        }
    }

    /**
     * Add checkboxes to the form.
     * @private
     */
    private addCheckboxesToForm(): void {
        this.choiceArray.forEach(() => this.checkboxesArray.push(new FormControl(false)));
    }

}
