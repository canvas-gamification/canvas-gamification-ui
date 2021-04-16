import {Component, Input, OnInit} from '@angular/core';
import {QuestionSubmission} from '@app/_models/question_submission';

@Component({
    selector: 'app-submission-snippet',
    templateUrl: './submission-snippet.component.html',
    styleUrls: ['./submission-snippet.component.scss']
})
export class SubmissionSnippetComponent implements OnInit {
    @Input() previousSubmissions: QuestionSubmission[];

    constructor() {
    }

    ngOnInit(): void {
        this.previousSubmissions.reverse();
    }
}
