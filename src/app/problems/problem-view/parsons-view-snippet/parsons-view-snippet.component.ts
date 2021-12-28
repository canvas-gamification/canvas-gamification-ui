import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ParsonsFile, UQJ} from '@app/_models';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

@Component({
    selector: 'app-parsons-view-snippet',
    templateUrl: './parsons-view-snippet.component.html',
    styleUrls: ['./parsons-view-snippet.component.scss'],
})
export class ParsonsViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;
    @Output() skipQuestionEvent = new EventEmitter<boolean>();

    files: (ParsonsFile & { solution: string })[]

    constructor(private submissionService: SubmissionService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    ngOnInit(): void {
        this.files = this.uqj.rendered_lines.map(file => ({
            ...file,
            solution: '',
        }));
    }

    /**
     * Submit an answer to the question.
     */
    onSubmit(): void {
        const solution = {};
        for (const file of this.files) {
            solution[file.name] = file.solution;
        }
        this.submissionService.postQuestionSubmission({
            question: this.uqj.question.id,
            solution: solution,
        }).subscribe(() => {
            this.notificationsService
                .show('The Question has been Submitted Successfully.', {
                    status: TuiNotification.Success
                }).subscribe();
        });
    }

    skipQuestion(value: boolean): void {
        this.skipQuestionEvent.emit(value);
    }
}
