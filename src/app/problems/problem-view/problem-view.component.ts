import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UQJ, User} from '@app/_models';
import {UqjService} from '@app/problems/_services/uqj.service';
import {QuestionSubmission} from '@app/_models/question_submission';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {TuiStatusT} from "@taiga-ui/kit";

@Component({
    selector: 'app-problem-view',
    templateUrl: './problem-view.component.html',
    styleUrls: ['./problem-view.component.scss'],
})
export class ProblemViewComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private uqjService: UqjService,
                private submissionService: SubmissionService,
                private authenticationService: AuthenticationService,
                private sanitizer: DomSanitizer) {
    }

    uqj: UQJ;
    previousSubmissions: QuestionSubmission[];
    user: User;
    safeRenderedText: SafeHtml;

    ngOnInit(): void {
        const questionId = this.route.snapshot.params.id;
        this.uqjService.getUQJByQuestion(questionId).subscribe(uqj => {
            this.uqj = uqj;
            const uqjRenderedText = this.parseQuestionHTMLToUseTaiga(this.uqj.rendered_text);
            this.safeRenderedText = this.sanitizer.bypassSecurityTrustHtml(uqjRenderedText);
        });

        this.submissionService.getPreviousSubmissions(questionId, {ordering: 'submission_time'}).subscribe(submissions => {
            this.previousSubmissions = submissions;
        });

        this.authenticationService.currentUser.subscribe(user => {
            this.user = user;
        });
    }

    getUQJTagStatus(status: string): TuiStatusT {
        if (status === 'Solved') return 'success';
        else if (status === 'Partially Solved') return 'warning';
        else if (status === 'Wrong') return 'error';
        else return 'default';
    }

    /**
     * Take question HTML and parse it to work with Taiga-UI styling.
     * The first paragraph element has its top margin removed.
     * Code blocks (pre elements) become Taiga islands.
     * @param html The html to be parsed
     */
    parseQuestionHTMLToUseTaiga(html: string): string {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(html, 'text/html');
        htmlDoc.querySelector('p')?.classList.add('tui-space_top-0');
        htmlDoc.querySelectorAll('pre')?.forEach(codeBlock => {
            const islandWrapper = document.createElement('div');
            islandWrapper.classList.add('tui-island', 'tui-island_size_m');
            codeBlock.parentNode.insertBefore(islandWrapper, codeBlock);
            islandWrapper.appendChild(codeBlock);
        });
        return htmlDoc.documentElement.outerHTML;
    }
}
