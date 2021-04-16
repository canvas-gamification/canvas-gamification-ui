import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {FormBuilder} from '@angular/forms';
import {MESSAGE_TYPES, UQJ} from '@app/_models';

@Component({
    selector: 'app-java-view-snippet',
    templateUrl: './java-view-snippet.component.html',
    styleUrls: ['./java-view-snippet.component.scss']
})
export class JavaViewSnippetComponent implements OnInit {
    @Input() uqj: UQJ;
    inputFileNames = new Array<{ name: string, template: string }>();

    constructor(private questionService: QuestionService, private messageService: MessageService, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.inputFileNames = this.uqj.question.input_file_names;
    }

    onSubmit() {
        const codeSolution = {};
        this.inputFileNames.forEach(file => {
            codeSolution[file.name] = file.template;
        });
        this.questionService.postQuestionSubmission({question: this.uqj.question.id, solution: codeSolution})
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
