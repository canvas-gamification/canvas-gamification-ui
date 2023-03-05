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
    mistakeMessages: string[]
    passedTestNames: string[]
    test: string[]

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
        this.getTestOutputMessages()
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

    getTestOutputMessages() : void {
        const testErrorNames: string[] =
            this.submission?.get_failed_test_results.map(a => {
                const index: number = a.name.indexOf("[")
                if (index !== -1)
                    return a.name.substring(0, index)
                else
                    return a.name
            })
        const testPassedNames: string[] =
            this.submission?.get_passed_test_results.map( a => {
                const index: number = a.name.indexOf("[")
                let k = a.name
                if (index !== -1)
                    k = a.name.substring(0, index)
                if (!testErrorNames.find(item => item === k))
                    return k
            })
        this.test = [...new Set(testErrorNames)]
        // let testPassedNames: string[] =
        //     this.submission?.get_passed_test_results.map(a => a.name)

        // this.mistakeMessages =
        //     [...new Set(this.submission?.get_failed_test_results.map(a => a.message))]
        this.passedTestNames =
            [...new Set(testPassedNames)]
    }
}
