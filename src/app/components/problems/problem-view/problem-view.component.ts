import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UQJ} from '@app/_models';
import {UqjService} from '@app/_services/api/uqj.service';
import {QuestionSubmission} from '@app/_models/question_submission';
import {SubmissionService} from '@app/_services/api/problem/submission.service';

@Component({
    selector: 'app-problem-view',
    templateUrl: './problem-view.component.html',
    styleUrls: ['./problem-view.component.scss']
})
export class ProblemViewComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private uqjService: UqjService,
                private submissionService: SubmissionService) {
    }

    UQJDetails: UQJ;
    previousSubmissions: QuestionSubmission[];

    ngOnInit(): void {
        const questionId = this.route.snapshot.params.id;
        this.uqjService.getUQJByQuestion(questionId).subscribe(uqj => {
            this.UQJDetails = uqj;
        });

        this.submissionService.getPreviousSubmissions(questionId).subscribe(submissions => {
            this.previousSubmissions = submissions;
        });
    }
}
