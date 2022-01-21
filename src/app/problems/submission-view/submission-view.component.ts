import {Component, OnInit} from '@angular/core';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {QuestionSubmission} from '@app/_models/question_submission';
import {ActivatedRoute} from '@angular/router';
import {TuiStatus} from "@taiga-ui/kit";

@Component({
    selector: 'app-submission-view',
    templateUrl: './submission-view.component.html',
    styleUrls: ['./submission-view.component.scss'],
})
export class SubmissionViewComponent implements OnInit {
    submission: QuestionSubmission;
    answerFiles: { name: string, code: string }[];

    constructor(private submissionService: SubmissionService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;
        this.submissionService.getSubmission(id).subscribe(submission => {
            this.submission = submission;

            this.answerFiles = [];
            if (submission.answer_files) {
                for (const key of Object.keys(submission.answer_files)) {
                    this.answerFiles.push({
                        name: key,
                        code: submission.answer_files[key],
                    });
                }
            }
        });
    }

    getSubmissionTagStatus(status: string | undefined): TuiStatus {
        if (status === 'Correct') return TuiStatus.Success;
        if (status === 'Wrong') return TuiStatus.Error;
        else return TuiStatus.Default;
    }
}
