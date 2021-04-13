import {Component, OnInit} from '@angular/core';
import {SubmissionService} from '@app/_services/api/problem/submission.service';
import {QuestionSubmission} from '@app/_models/questionSubmission';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-submission-view',
    templateUrl: './submission-view.component.html',
    styleUrls: ['./submission-view.component.scss']
})
export class SubmissionViewComponent implements OnInit {
    submission: QuestionSubmission;

    constructor(private submissionService: SubmissionService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        this.submissionService.getSubmission(id).subscribe(submission => this.submission = submission);
    }

}
