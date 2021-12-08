import {Component, Inject, Input, OnInit} from '@angular/core';
import {CourseEvent, Question, UQJ, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute, Router} from '@angular/router';
import {UqjService} from '@app/problems/_services/uqj.service';
import {forkJoin} from 'rxjs';
import {CourseEventService} from '@app/course/_services/course-event.service';
import {CourseService} from '@app/course/_services/course.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionReportForm} from "@app/course/_forms/question-report.form";
import {FormGroup} from "@angular/forms";
import {QuestionReport} from "@app/_models/question_report";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";
import {QuestionReportService} from "@app/course/_services/question-report.service";

@Component({
    selector: 'app-course-question-snippet',
    templateUrl: './course-question-snippet.component.html',
    styleUrls: ['./course-question-snippet.component.scss']
})
export class CourseQuestionSnippetComponent implements OnInit {
    @Input() questions: Question[];
    @Input() uqjs: UQJ[];
    user: User;
    event: CourseEvent;
    eventId: number;
    courseId: number;
    formGroup: FormGroup;
    reportUQJ: UQJ;

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute,
                private uqjService: UqjService,
                private courseEventService: CourseEventService,
                private courseService: CourseService,
                private modalService: NgbModal,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
                private questionReportService: QuestionReportService) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);

    }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.paramMap.get('courseId') || null;
        this.eventId = +this.route.snapshot.paramMap.get('eventId') || null;
        this.formGroup = QuestionReportForm.createForm();
        if (this.eventId && this.courseId) { // if this snippet is an event-view
            this.courseService.validateEvent(this.courseId, this.eventId).subscribe(response => {
                if (response.success) {
                    forkJoin({
                        event: this.courseEventService.getCourseEvent(this.eventId),
                        uqjs: this.uqjService.getUQJs({filters: {question_event: this.eventId}}),
                    }).subscribe(result => {
                        this.event = result.event;
                        this.uqjs = result.uqjs.results;
                    });
                } else {
                    this.router.navigate(['course/view', this.courseId]).then();
                }
            });
        }
    }

    /**
     * Returns the status text based on the UQJ object passed
     * @param uqj - the UQJ object to be checked
     */
    getStatus(uqj: UQJ): string {
        // If the event exists, or if it is a non event, return default status text
        if (!uqj.question.event || !uqj.question.is_exam) {
            return uqj.status;
        }

        if (uqj.question.is_exam && uqj.num_attempts > 0) {
            return 'Submitted';
        } else if (uqj.question.is_exam) {
            return 'Not Submitted';
        }
    }

    /**
     * Return the CSS class corresponding to the completion status of the UQJ
     * @param status - the status text to be checked
     */
    highlight(status: string): string {
        if (status.localeCompare('Solved') === 0) {
            return 'highlight-success';
        } else if (status.localeCompare('Partially Solved') === 0) {
            return 'highlight-warning';
        } else if (status.localeCompare('Wrong') === 0) {
            return 'highlight-danger';
        }
        return '';
    }

    deleteReport(): void {
        this.questionReportService.deleteReport(this.reportUQJ.report.id).subscribe(() => {
            this.notificationsService
                .show('The Report has been Deleted Successfully.', {
                    status: TuiNotification.Success
                }).subscribe();
            this.reportUQJ.report = {} as QuestionReport;
        });
    }

    fillReport(): void {
        this.formGroup.setValue({
            description: this.reportUQJ.report.report,
            description_text: this.reportUQJ.report.report_details
        });
    }

    createModal(content: unknown, uqj: UQJ): void {
        this.reportUQJ = uqj;
        this.formGroup.reset();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
        if (this.reportUQJ.report.id != null) {
            this.fillReport();
        }
    }

    reportQuestion(): void {
        if (this.reportUQJ.report.id != null) {
            const questionReport: QuestionReport = {
                report: this.formGroup.get('description').value,
                report_details: this.formGroup.get('description_text').value
            };
            this.questionReportService.updateReport(questionReport, this.reportUQJ.report.id).subscribe(response => {
                this.notificationsService
                    .show('The Report was been Created Successfully.', {
                        status: TuiNotification.Success
                    }).subscribe();
                this.reportUQJ.report = response;
            });
        } else {
            const questionReport: QuestionReport = {
                question: this.reportUQJ.question.id, report: this.formGroup.get('description').value,
                report_details: this.formGroup.get('description_text').value
            };
            this.questionReportService.sendReport(questionReport).subscribe(response => {
                this.notificationsService
                    .show('The Report was been Created Successfully.', {
                        status: TuiNotification.Success
                    }).subscribe();
                this.reportUQJ.report = response;
            });
        }
    }

    isSubmissionValid(): boolean {
        if (this.formGroup.get('description').value != null && this.formGroup.get('description').value != 'OTHER') {
            return false;
        } else if (this.formGroup.get('description').value == 'OTHER'
            && this.formGroup.get('description_text').value != null) {
            if (this.formGroup.get('description_text').value.length != 0)
                return false;
        }
        return true;
    }
}
