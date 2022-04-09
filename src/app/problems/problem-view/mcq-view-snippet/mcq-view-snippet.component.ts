import {Component, Inject, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UQJ} from '@app/_models';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {TuiNotification, TuiNotificationsService} from '@taiga-ui/core';

@Component({
    selector: 'app-mcq-view-snippet',
    templateUrl: './mcq-view-snippet.component.html',
    styleUrls: ['./mcq-view-snippet.component.scss'],
})
export class McqViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;
    @Output() readonly successfulSubmissionEvent = new EventEmitter<boolean>();
    formData: FormGroup;
    checkboxFormData: FormGroup;
    choiceArray: { id: string, value: string, safeValue: SafeHtml }[];
    checkboxAnswers: string[];
    waitingSubmission = false;

    constructor(private submissionService: SubmissionService,
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
                solution: new FormControl(null, [Validators.required])
            });
        } else {
            this.checkboxAnswers = [];
            this.checkboxFormData = this.formBuilder.group({
                question: new FormControl(this.uqj.question.id),
                solutions: new FormArray(this.choiceArray.map(() => new FormControl(false)))
            });
            this.checkboxFormData.controls.solutions.valueChanges.subscribe((answers) => {
                this.checkboxAnswers = answers.map((answer, index) => {
                    if (answer) return this.choiceArray[index].id;
                }).filter(id => id !== undefined);
            });
        }
    }

    /**
     * Submit an answer to the question.
     */
    onSubmit(formData: { question: number, solution: unknown }): void {
        this.waitingSubmission = true;
        this.submissionService.postQuestionSubmission(formData).subscribe(() => {
            this.notificationsService
                .show('The Question has been Submitted Successfully.', {
                    status: TuiNotification.Success
                }).subscribe();
            this.successfulSubmissionEvent.emit(true);
            this.waitingSubmission = false;
        }, () => {
            this.waitingSubmission = false;
        });
    }

    /**
     * Submit an answer for a checkbox question.
     */
    onCheckboxSubmit(): void {
        this.waitingSubmission = true;
        this.submissionService.postQuestionSubmission({
            question: this.checkboxFormData.value.question,
            solution: this.checkboxAnswers.sort().toString()
        }).subscribe(() => {
            this.notificationsService
                .show('The Question has been Submitted Successfully.', {
                    status: TuiNotification.Success
                }).subscribe();
            this.successfulSubmissionEvent.emit(true);
            this.waitingSubmission = false;
        }, () => {
            this.waitingSubmission = false;
        });
    }
}
