import {Component, Inject, Input, OnInit} from '@angular/core';
import {UQJ} from '@app/_models';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

@Component({
    selector: 'app-java-view-snippet',
    templateUrl: './java-view-snippet.component.html',
    styleUrls: ['./java-view-snippet.component.scss'],
})
export class JavaViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;
    inputFileNames = new Array<{ name: string, template: string }>();

    constructor(
        private submissionService: SubmissionService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    ngOnInit(): void {
        this.inputFileNames = this.uqj.input_files;
    }

    /**
     * Submit an answer to the question.
     */
    onSubmit(): void {
        const codeSolution = {};
        this.inputFileNames.forEach(file => {
            codeSolution[file.name] = file.template;
        });
        this.submissionService.postQuestionSubmission({question: this.uqj.question.id, solution: codeSolution})
            .subscribe(() => {
                this.notificationsService
                    .show('The Question has been Submitted Successfully.', {
                        status: TuiNotification.Success
                    }).subscribe();
            });
    }
}
