import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, Question, UQJ, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute, Router} from '@angular/router';
import {UqjService} from '@app/problems/_services/uqj.service';
import {forkJoin} from 'rxjs';
import {CourseEventService} from '@app/course/_services/course-event.service';
import {CourseService} from '@app/course/_services/course.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionReportForm} from "@app/course/_forms/Question-Report.form";
import {FormGroup} from "@angular/forms";
import {QuestionReport} from "@app/_models/Question_Report";
import {ToastrService} from "ngx-toastr";
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
    question: Question;
    userId: number;
    formGroup: FormGroup;
    questionReport: QuestionReport;
    reportedQuestions: number[];

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute,
                private uqjService: UqjService,
                private courseEventService: CourseEventService,
                private courseService: CourseService,
                private modalService: NgbModal,
                private toastr: ToastrService,
                private questionReportSerivce: QuestionReportService) {
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
        this.reportedQuestions = this.reportCheck(this.uqjs);
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
        this.questionReportSerivce.deleteReport(this.userId, this.question.id).subscribe(() => {
            this.toastr.success('The report was deleted.');
            this.reportedQuestions = this.reportedQuestions.filter(e => e !== this.question.id);
        });
    }

    getReport(uqj: UQJ): void {
        this.userId = this.user.id;
        this.question = uqj.question;
        this.questionReportSerivce.getReport(this.userId, this.question.id).subscribe(response => {
            console.log(response.report);
            this.formGroup.setValue({
                description: response.report,
                description_text: response.report_details
            });
        });
    }

    reportCheck(uqjs: UQJ[]): number[] {
        const num = [];
        this.userId = this.user.id;
        for (const uqj of uqjs) {
            this.question = uqj.question;
            this.questionReportSerivce.getReport(this.userId, this.question.id).subscribe(response => {
                if (response.report != null) {
                    if (uqj.question.id !== undefined) {
                        num.push(uqj.question.id);
                    }
                }
            });
        }
        return num;
    }

    createModal(content: unknown, exists: boolean, uqj: UQJ): void {
        this.question = uqj.question;
        this.formGroup.reset();
        if (exists) {
            this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
        } else {
            this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
            this.getReport(uqj);
        }
    }

    reportQuestion(): void {
        const data: { user: User, question: Question, report: string, report_details: string } = {
            user: this.user,
            question: this.question, report: this.formGroup.get('description').value,
            report_details: this.formGroup.get('description_text').value
        };
        this.questionReportSerivce.sendReport(data).subscribe(() => {
            this.toastr.success('The action was performed successfully.');
            this.reportedQuestions.push(this.question.id);
        });
    }

    isSubmissionValid(): boolean {
        if (this.formGroup.get('description').value == null || (this.formGroup.get('description').value == 'OTHER'
            && this.formGroup.get('description_text').value == null)) {
            return true;
        };
    };
}
