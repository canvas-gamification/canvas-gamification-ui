import {Component, EventEmitter, Input, Output, OnInit, Inject} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {ReportQuestionService} from "@app/problems/_services/report-question.service";
import {ReportQuestionForm} from "@app/problems/_forms/problem-report.form";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

@Component({
    selector: 'app-problem-report-modal',
    templateUrl: './problem-report-modal.component.html',
    styleUrls: ['./problem-report-modal.component.scss']
})
export class ProblemReportModalComponent implements OnInit {
    @Input() open = false;
    @Output() readonly openChange = new EventEmitter<boolean>();
    @Input() questionId: number;

    formGroup: FormGroup;

    readonly reportOptions = [
        ["TYPO_TEXT", "There is a typo in the question instructions"],
        ["TYPO_ANSWER", "There is a typo in one of the multiple-choice answers"],
        ["RIGHT_SOLUTION_MARKED_WRONG", "My solution is definitely correct but it did not get full marks"],
        ["WRONG_SOLUTION_MARKED_RIGHT", "My solution is incorrect but it received full marks"],
        ["OTHER", "Other"]
    ];

    constructor(
        private readonly reportQuestionService: ReportQuestionService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
    }

    ngOnInit() {
        this.formGroup = ReportQuestionForm.createForm();
    }

    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    toggleDialog(open: boolean) {
        this.open = open;
        this.openChange.emit(this.open);
    }

    submitReport() {
        this.reportQuestionService.reportQuestion(this.questionId, ReportQuestionForm.extractData(this.formGroup)).subscribe(() => {
            this.notificationsService
                .show('The question has been successfully reported.', {
                    status: TuiNotification.Success
                }).subscribe();
        });

        this.toggleDialog(false);
    }
}
