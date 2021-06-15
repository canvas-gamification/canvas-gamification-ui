import {Component, Input, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UQJ} from '@app/_models';
import {SubmissionService} from '@app/_services/api/problem/submission.service';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
    selector: 'app-mcq-view-snippet',
    templateUrl: './mcq-view-snippet.component.html',
    styleUrls: ['./mcq-view-snippet.component.scss']
})
export class McqViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;
    formData: FormGroup;
    checkboxFormData: FormGroup;
    choiceArray: { id: string, value: string, safeValue: SafeHtml }[];
    checkboxAnswers: string[];

    constructor(private submissionService: SubmissionService,
                private toastr: ToastrService,
                private formBuilder: FormBuilder,
                private sanitizer: DomSanitizer) {
    }

    get checkboxesArray(): FormArray {
        return this.checkboxFormData.controls.solutions as FormArray;
    }

    ngOnInit(): void {
        const outputArray = [];
        for (const choice in this.uqj.rendered_choices) {
            outputArray.push({
                id: choice,
                value: this.uqj.rendered_choices[choice],
                safeValue: this.sanitizer.bypassSecurityTrustHtml(this.uqj.rendered_choices[choice])
            });
            this.choiceArray = outputArray;
        }
        if (!this.uqj.is_checkbox) {
            this.formData = this.formBuilder.group({
                question: new FormControl(this.uqj.question.id),
                solution: new FormControl(null, [Validators.required])
            });
        } else {
            this.checkboxAnswers = [];
            this.checkboxFormData = this.formBuilder.group({
                question: new FormControl(this.uqj.question.id),
                solutions: new FormArray([])
            });
            this.addCheckboxesToForm();
        }
    }

    onSubmit(formData: { question: number, solution: unknown }): void {
        this.submissionService.postQuestionSubmission(formData)
            .subscribe((result) => {
                console.log(result);
                if (result.success != false)
                    this.toastr.success('The Question has been Submitted Successfully.');
            });
    }

    onCheckboxSubmit(): void {
        this.submissionService.postQuestionSubmission({
            question: this.checkboxFormData.value.question,
            solution: this.checkboxAnswers.sort().toString()
        }).subscribe((result) => {
            console.log(result);
            if (result.success != false)
                this.toastr.success('The Question has been Submitted Successfully.');
        });
    }

    checkboxChanged(e: Event): void {
        const input = e.target as HTMLInputElement;
        if (input.checked) {
            this.checkboxAnswers.push(input.id);
        } else {
            this.checkboxAnswers.splice(this.checkboxAnswers.findIndex(id => id === input.id), 1);
        }
    }

    private addCheckboxesToForm(): void {
        this.choiceArray.forEach(() => this.checkboxesArray.push(new FormControl(false)));
    }

}
