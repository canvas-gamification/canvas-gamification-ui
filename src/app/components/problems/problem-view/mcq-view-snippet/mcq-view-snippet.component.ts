import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MESSAGE_TYPES, UQJ} from '@app/_models';

@Component({
    selector: 'app-mcq-view-snippet',
    templateUrl: './mcq-view-snippet.component.html',
    styleUrls: ['./mcq-view-snippet.component.scss']
})
export class McqViewSnippetComponent implements OnInit {
    @Input() UQJDetails: UQJ;
    FormData: FormGroup;
    choiceArray: any[];

    constructor(private questionService: QuestionService,
                private messageService: MessageService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.FormData = this.formBuilder.group({
            question: new FormControl(this.UQJDetails.question.id),
            solution: new FormControl('')
        });

        const outputArray = [];
        for (const choice in this.UQJDetails.rendered_choices) {
            outputArray.push({
                id: choice,
                value: this.UQJDetails.rendered_choices[choice]
            });
            this.choiceArray = outputArray;
        }
    }

    onSubmit(FormData) {
        this.questionService.postQuestionSubmission(FormData)
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
