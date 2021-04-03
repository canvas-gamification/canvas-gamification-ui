import {Component, Input, OnInit} from '@angular/core';
import {QuestionSubmission} from '@app/_models/questionSubmission';

@Component({
    selector: 'app-submission-view',
    templateUrl: './submission-view.component.html',
    styleUrls: ['./submission-view.component.scss']
})
export class SubmissionViewComponent implements OnInit {
    @Input() previousSubmissions: QuestionSubmission[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
