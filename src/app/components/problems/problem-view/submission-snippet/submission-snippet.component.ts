import {Component, Input} from '@angular/core';
import {QuestionSubmission} from '@app/_models/question_submission';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-submission-snippet',
    templateUrl: './submission-snippet.component.html',
    styleUrls: ['./submission-snippet.component.scss']
})
export class SubmissionSnippetComponent {
    @Input() previousSubmissions: QuestionSubmission[];

    constructor(private sanitizer: DomSanitizer) {
        this.previousSubmissions.forEach((previousSubmission) => {
            previousSubmission.safeAnswer = this.sanitizer.bypassSecurityTrustHtml(previousSubmission.answer_display);
        });
    }
}
