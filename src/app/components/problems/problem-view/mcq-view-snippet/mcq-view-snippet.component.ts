import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UQJ} from '@app/_models';
import {SubmissionService} from '@app/_services/api/problem/submission.service';

@Component({
    selector: 'app-mcq-view-snippet',
    templateUrl: './mcq-view-snippet.component.html',
    styleUrls: ['./mcq-view-snippet.component.scss']
})
export class McqViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;
    formData: FormGroup;
    choiceArray: { id: string, value: string }[];

    constructor(private submissionService: SubmissionService,
                private toastr: ToastrService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.formData = this.formBuilder.group({
            question: new FormControl(this.uqj.question.id),
            solution: new FormControl(null, [Validators.required])
        });

        const outputArray = [];
        for (const choice in this.uqj.rendered_choices) {
            outputArray.push({
                id: choice,
                value: this.uqj.rendered_choices[choice]
            });
            this.choiceArray = outputArray;
        }
    }

    onSubmit(formData: { question: number, solution: unknown }): void {
        this.submissionService.postQuestionSubmission(formData)
            .subscribe(() => {
                this.toastr.success('The Question has been Submitted Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.toastr.error(error);
                console.warn(error);
                window.scroll(0, 0);
            });
    }

}
