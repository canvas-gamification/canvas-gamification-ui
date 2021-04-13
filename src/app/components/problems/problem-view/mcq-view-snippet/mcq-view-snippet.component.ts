import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {QuestionSubmission} from '@app/_models/question_submission';
import {MessageService} from '@app/_services/message.service';
import {forkJoin} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MESSAGE_TYPES} from '@app/_models';

@Component({
    selector: 'app-mcq-view-snippet',
    templateUrl: './mcq-view-snippet.component.html',
    styleUrls: ['./mcq-view-snippet.component.scss']
})
export class McqViewSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    @Input() UQJDetails;
    FormData: FormGroup;
    previousSubmissions: QuestionSubmission[];
    choiceArray: any[];

    constructor(private questionService: QuestionService,
                private messageService: MessageService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.FormData = this.formBuilder.group({
            question: new FormControl(this.QuestionDetails.id),
            solution: new FormControl('')
        });
        const previousSubmissionsObservable = this.questionService.getPreviousSubmissions(this.QuestionDetails.id);
        forkJoin([previousSubmissionsObservable])
            .subscribe(result => {
                this.previousSubmissions = result[0];
            });
        const outputArray = [];
        // tslint:disable-next-line:forin
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
                this.questionService.getPreviousSubmissions(this.QuestionDetails.id).subscribe(result => {
                    this.previousSubmissions = result;
                });
                window.scroll(0, 0);
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                console.warn(error.responseText);
                window.scroll(0, 0);
            });
    }

}
