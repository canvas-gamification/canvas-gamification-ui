import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {UQJ, User} from '@app/_models'
import {UqjService} from '@app/problems/_services/uqj.service'
import {QuestionSubmission} from '@app/_models/question_submission'
import {SubmissionService} from '@app/problems/_services/submission.service'
import {AuthenticationService} from '@app/_services/api/authentication'
import {combineLatest, Subscriber, Subscription} from 'rxjs'

@Component({
    selector: 'app-problem-view',
    templateUrl: './problem-view.component.html',
    styleUrls: ['./problem-view.component.scss'],
})
export class ProblemViewComponent implements OnChanges, OnInit, OnDestroy {
    @Input() questionId: number
    uqj: UQJ
    previousSubmissions: QuestionSubmission[]
    user: User
    renderedText: string
    subscriptions: Subscription = new Subscription()

    reloadRequestSubscriber: Subscriber<never>


    constructor(
        private route: ActivatedRoute,
        private uqjService: UqjService,
        private submissionService: SubmissionService,
        private authenticationService: AuthenticationService,
    ) {
    }

    initialize(): void {
        const questionId = this.questionId ?? this.route.snapshot.params.id
        this.subscriptions.add(combineLatest([
            this.uqjService.getUQJByQuestion(questionId),
            this.submissionService.getPreviousSubmissions(questionId, {ordering: 'submission_time'}),
            this.authenticationService.currentUser,
        ]).subscribe(([uqj, submissions, user]) => {
            this.uqj = uqj
            this.renderedText = this.uqj.rendered_text
            this.previousSubmissions = submissions
            this.user = user
        }))
    }

    ngOnInit(): void {
        this.initialize()
    }

    ngOnChanges(): void {
        this.initialize()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    /**
     * Updates the submissions for a question following a successful submission.
     * @param newSubmission A boolean that describes if a question has been successfully submitted.
     */
    updateQuestionSubmissions(newSubmission: boolean): void {
        if (newSubmission) {
            this.reloadRequestSubscriber?.next()
        }
    }
}
