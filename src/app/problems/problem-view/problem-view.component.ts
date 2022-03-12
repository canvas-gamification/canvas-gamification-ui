import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UQJ, User} from '@app/_models';
import {UqjService} from '@app/problems/_services/uqj.service';
import {QuestionSubmission} from '@app/_models/question_submission';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {QuestionService} from "@app/problems/_services/question.service";

@Component({
    selector: 'app-problem-view',
    templateUrl: './problem-view.component.html',
    styleUrls: ['./problem-view.component.scss'],
})
export class ProblemViewComponent implements OnChanges, OnInit {
    @Input() questionId: number;

    equation = "<span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>e</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding=\"application/x-tex\">e=mc^2</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.4306em;\"></span><span class=\"mord mathnormal\">e</span><span class=\"mspace\" style=\"margin-right:0.2778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right:0.2778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:0.8141em;\"></span><span class=\"mord mathnormal\">m</span><span class=\"mord\"><span class=\"mord mathnormal\">c</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.8141em;\"><span style=\"top:-3.063em;margin-right:0.05em;\"><span class=\"pstrut\" style=\"height:2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span></span></span></span>";

    constructor(
        private route: ActivatedRoute,
        private uqjService: UqjService,
        private submissionService: SubmissionService,
        private authenticationService: AuthenticationService,
        private questionService: QuestionService,
    ) {
    }

    uqj: UQJ;
    previousSubmissions: QuestionSubmission[];
    user: User;
    renderedText: string;

    initialize(): void {
        const questionId = this.questionId ?? this.route.snapshot.params.id;
        this.uqjService.getUQJByQuestion(questionId).subscribe(uqj => {
            this.uqj = uqj;
            // this.renderedText = this.parseQuestionHTMLToUseTaiga(this.uqj.rendered_text);
            this.renderedText = this.uqj.rendered_text;
        });

        this.submissionService.getPreviousSubmissions(questionId, {ordering: 'submission_time'}).subscribe(submissions => {
            this.previousSubmissions = submissions;
        });

        this.authenticationService.currentUser.subscribe(user => {
            this.user = user;
        });

        this.questionService.openedQuestion(questionId).subscribe();
    }

    ngOnInit(): void {
        this.initialize();
    }

    ngOnChanges(): void {
        this.initialize();
    }

    /**
     * Take question HTML and parse it to work with Taiga-UI styling.
     * The first paragraph element has its top margin removed.
     * Code blocks (pre elements) become Taiga islands.
     * @param html The html to be parsed
     */
    // parseQuestionHTMLToUseTaiga(html: string): string {
    //     const parser = new DOMParser();
    //     const htmlDoc = parser.parseFromString(html, 'text/html');
    //     htmlDoc.querySelector('p')?.classList.add('tui-space_top-0');
    //     htmlDoc.querySelectorAll('pre')?.forEach(codeBlock => {
    //         const islandWrapper = document.createElement('div');
    //         islandWrapper.classList.add('tui-island', 'tui-island_size_m');
    //         codeBlock.parentNode.insertBefore(islandWrapper, codeBlock);
    //         islandWrapper.appendChild(codeBlock);
    //     });
    //     return htmlDoc.documentElement.outerHTML;
    // }

    /**
     * Updates the submissions for a question following a successful submission.
     * @param newSubmission A boolean that describes if a question has been successfully submitted.
     */
    updateQuestionSubmissions(newSubmission: boolean): void {
        if (newSubmission) {
            this.initialize();
        }
    }
}
