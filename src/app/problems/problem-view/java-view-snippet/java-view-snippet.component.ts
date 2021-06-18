import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UQJ} from '@app/_models';
import {SubmissionService} from '@app/problems/_services/submission.service';

@Component({
    selector: 'app-java-view-snippet',
    templateUrl: './java-view-snippet.component.html',
    styleUrls: ['./java-view-snippet.component.scss'],
    providers: [SubmissionService]
})
export class JavaViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;
    inputFileNames = new Array<{ name: string, template: string }>();

    constructor(
        private toastr: ToastrService,
        private submissionService: SubmissionService) {
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
                this.toastr.success('The Question has been Submitted Successfully.');
            });
    }
}
