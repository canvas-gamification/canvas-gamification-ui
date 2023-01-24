import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core'
import {SubmissionService} from '@app/problems/_services/submission.service'
import {QuestionSubmission} from '@app/_models/question_submission'
import {ActivatedRoute} from '@angular/router'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {TuiDialogContext} from '@taiga-ui/core'

@Component({
    selector: 'app-submission-view',
    templateUrl: './submission-view.component.html',
    styleUrls: ['./submission-view.component.scss'],
})
export class SubmissionViewComponent implements OnInit {
    submission: QuestionSubmission
    answerFiles: { name: string, code: string }[] = []

    constructor(
        private submissionService: SubmissionService,
        private route: ActivatedRoute,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<QuestionSubmission>,
        private changeDetector: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.submission = this.context.data
        this.answerFiles =
            Object.entries(this.submission.answer_files)
                .reduce((prev, [key, value]) => {
                    return [...prev, {
                        name: key,
                        code: value
                    }]
                }, [])
        this.changeDetector.detectChanges()
    }

    getPattern(type: string) {
        return this.submission.bugs.patterns.find(p => p.type === type)
    }

    closeDialog(): void {
        this.context.completeWith(null)
    }
}
