import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UQJ, User} from '@app/_models';
import {UqjService} from '@app/problems/_services/uqj.service';
import {QuestionSubmission} from '@app/_models/question_submission';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
    selector: 'app-problem-view',
    templateUrl: './problem-view.component.html',
    styleUrls: ['./problem-view.component.scss'],
})
export class ProblemViewComponent implements OnInit, OnChanges {
    @Input() isPractice = false;
    @Input() currentUqj: UQJ;
    @Output() readonly skipQuestionEvent = new EventEmitter<boolean>();
    @Output() readonly previousQuestionEvent = new EventEmitter<boolean>();
    @Output() readonly submissionEvent = new EventEmitter<boolean>();
    uqj: UQJ;
    previousSubmissions: QuestionSubmission[];
    user: User;
    safeRenderedText: SafeHtml;
    questionId: number;

    constructor(private route: ActivatedRoute,
                private uqjService: UqjService,
                private submissionService: SubmissionService,
                private authenticationService: AuthenticationService,
                private sanitizer: DomSanitizer) {
    }

    ngOnChanges(): void {
        this.uqj = this.currentUqj;
        this.questionId = this.uqj.question.id;
        this.safeRenderedText = this.sanitizer.bypassSecurityTrustHtml(this.uqj.rendered_text);
        this.submissionService.getPreviousSubmissions(this.questionId, {ordering: '-submission_time'}).subscribe(submissions => {
            this.previousSubmissions = submissions;
        });
    }

    ngOnInit(): void {
        if (this.isPractice) {
            this.questionId = this.currentUqj.question.id;
        } else {
            this.questionId = this.route.snapshot.params.id;
        }
        this.uqjService.getUQJByQuestion(this.questionId).subscribe(uqj => {
            this.uqj = uqj;
            this.safeRenderedText = this.sanitizer.bypassSecurityTrustHtml(this.uqj.rendered_text);
        });

        this.submissionService.getPreviousSubmissions(this.questionId, {ordering: '-submission_time'}).subscribe(submissions => {
            this.previousSubmissions = submissions;
        });

        this.authenticationService.currentUser.subscribe(user => {
            this.user = user;
        });
    }

    /**
     * Emits an event to skip the current question.
     * @param value - The value to emit.
     */
    skipQuestion(value: boolean): void {
        this.skipQuestionEvent.emit(value);
    }

    /**
     * Emits an event to return to the previous question.
     * @param value
     */
    previousQuestion(value: boolean): void {
        this.previousQuestionEvent.emit(value);
    }

    /**
     * Emits an event when a question is submitted.
     * @param value - The value to emit.
     */
    submitQuestion(value: boolean): void {
        this.submissionEvent.emit(value);
    }

}
