import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {forkJoin} from 'rxjs';
import {QuestionSubmission} from '@app/_models/question_submission';
import {MessageService} from '@app/_services/message.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MESSAGE_TYPES} from '@app/_models';

@Component({
    selector: 'app-java-view-snippet',
    templateUrl: './java-view-snippet.component.html',
    styleUrls: ['./java-view-snippet.component.scss']
})
export class JavaViewSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    @Input() UQJDetails;
    @Input() questionType;
    previousSubmissions: QuestionSubmission[];
    inputFileNames = new Array<{name: string, template: string}>();

    constructor(private questionService: QuestionService, private messageService: MessageService, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.inputFileNames = this.QuestionDetails.input_file_names;
        const previousSubmissionsObservable = this.questionService.getPreviousSubmissions(this.QuestionDetails.id);
        forkJoin([previousSubmissionsObservable])
            .subscribe(result => {
                this.previousSubmissions = result[0];
            });
    }

    onSubmit() {
        const codeSolution = {};
        this.inputFileNames.forEach(file => {
            codeSolution[file.name] = file.template;
        });
        this.questionService.postQuestionSubmission({question: this.QuestionDetails.id, solution: codeSolution})
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
