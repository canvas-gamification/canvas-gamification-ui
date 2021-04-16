import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '@app/_services/message.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MESSAGE_TYPES, UQJ} from '@app/_models';
import {SubmissionService} from '@app/_services/api/problem/submission.service';

@Component({
    selector: 'app-mcq-view-snippet',
    templateUrl: './mcq-view-snippet.component.html',
    styleUrls: ['./mcq-view-snippet.component.scss']
})
export class McqViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;
    FormData: FormGroup;
    choiceArray: any[];

    constructor(private submissionService: SubmissionService,
                private messageService: MessageService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.FormData = this.formBuilder.group({
            question: new FormControl(this.uqj.question.id),
            solution: new FormControl('')
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

    onSubmit(FormData) {
        this.submissionService.postQuestionSubmission(FormData)
            .subscribe(response => {
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'The Question has been Submitted Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                console.warn(error.responseText);
                window.scroll(0, 0);
            });
    }

}
