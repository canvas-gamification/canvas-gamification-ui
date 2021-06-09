import {Component, Input, OnInit} from '@angular/core';
import {QuestionSubmission} from '@app/_models/question_submission';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-submission-snippet',
    templateUrl: './submission-snippet.component.html',
    styleUrls: ['./submission-snippet.component.scss']
})
export class SubmissionSnippetComponent implements OnInit {
    @Input() previousSubmissions: QuestionSubmission[];

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.previousSubmissions.forEach((previousSubmission) => {
            if (typeof previousSubmission.answer_display === 'string') {
                previousSubmission.safeAnswer = this.sanitizer.bypassSecurityTrustHtml(previousSubmission.answer_display);
            } else {
                previousSubmission.safeAnswers = [];
                previousSubmission.answer_display.forEach((answer) => {
                    previousSubmission.safeAnswers.push(this.sanitizer.bypassSecurityTrustHtml(answer));
                });
            }
        });
    }

}
