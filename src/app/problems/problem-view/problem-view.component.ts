import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {UQJ, User} from '@app/_models'
import {UqjService} from '@app/problems/_services/uqj.service'
import {AuthenticationService} from '@app/_services/api/authentication'
import {Subscriber, Subscription} from 'rxjs'

@Component({
    selector: 'app-problem-view',
    templateUrl: './problem-view.component.html',
    styleUrls: ['./problem-view.component.scss'],
})
export class ProblemViewComponent implements OnInit, OnChanges, OnDestroy {
    @Input() questionId: number
    uqj: UQJ
    user: User
    renderedText: string
    subscriptions: Subscription = new Subscription()

    reloadRequestSubscriber: Subscriber<never>


    constructor(
        private route: ActivatedRoute,
        private uqjService: UqjService,
        private authenticationService: AuthenticationService,
    ) {
    }

    initialize(): void {
        const questionId = this.questionId ?? this.route.snapshot.params.id
        this.uqjService.getUQJByQuestion(questionId).subscribe(uqj => {
            this.uqj = uqj
            this.renderedText = this.uqj.rendered_text
        })
        this.user = this.authenticationService.currentUserValue
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
