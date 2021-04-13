import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-problem-submission',
    templateUrl: './problem-submission.component.html',
    styleUrls: ['./problem-submission.component.scss']
})
export class ProblemSubmissionComponent implements OnInit {
    questionId: number;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.questionId = this.route.snapshot.params.id;
    }

}
