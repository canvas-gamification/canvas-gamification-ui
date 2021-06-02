import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UQJ} from '@app/_models';
import {SubmissionService} from '@app/_services/api/problem/submission.service';

@Component({
    selector: 'app-java-view-snippet',
    templateUrl: './java-view-snippet.component.html',
    styleUrls: ['./java-view-snippet.component.scss']
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

    onSubmit(): void {
        const codeSolution = {};
        this.inputFileNames.forEach(file => {
            codeSolution[file.name] = file.template;
        });
        this.submissionService.postQuestionSubmission({question: this.uqj.question.id, solution: codeSolution})
            .subscribe((result) => {
                if (result.success)
                    this.toastr.success('The Question has been Submitted Successfully.');
            });
    }
}
