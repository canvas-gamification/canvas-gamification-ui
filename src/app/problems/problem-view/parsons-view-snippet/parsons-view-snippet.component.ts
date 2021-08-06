import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ParsonsFile, UQJ} from '@app/_models';
import {SubmissionService} from '@app/problems/_services/submission.service';

@Component({
    selector: 'app-parsons-view-snippet',
    templateUrl: './parsons-view-snippet.component.html',
    styleUrls: ['./parsons-view-snippet.component.scss'],
})
export class ParsonsViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;

    files: (ParsonsFile & { solution: string })[]

    constructor(private submissionService: SubmissionService, private toastr: ToastrService) {
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
        }).subscribe((response) => {
            if (response.status === 201)
                this.toastr.success('The Question has been Submitted Successfully.');
        });
    }
}
