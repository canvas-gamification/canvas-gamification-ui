import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {DragulaService} from 'ng2-dragula';
import {forkJoin} from 'rxjs';
import {QuestionSubmission} from '@app/_models/questionSubmission';
import {FormBuilder} from '@angular/forms';
import {MessageService} from '@app/_services/message.service';
import * as indentString from 'indent-string';

class ContainerObject {
    constructor(public value: string) {
    }
}

@Component({
    selector: 'app-parsons-view-snippet',
    templateUrl: './parsons-view-snippet.component.html',
    styleUrls: ['./parsons-view-snippet.component.scss']
})
export class ParsonsViewSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    @Input() UQJDetails;
    code = '';
    PARSONS_LINES = 'PARSONS_LINES';
    parsonLines: any[];
    parsonAnswerLines: any[];
    variables: any[];
    previousSubmissions: QuestionSubmission[];

    constructor(private questionService: QuestionService,
                private dragulaService: DragulaService,
                private formBuilder: FormBuilder,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        const previousSubmissionsObservable = this.questionService.getPreviousSubmissions(this.QuestionDetails.id);
        forkJoin([previousSubmissionsObservable])
            .subscribe(result => {
                this.previousSubmissions = result[0];
            });
        this.parsonLines = [];
        for (const line of this.QuestionDetails.lines) {
            this.parsonLines.push(new ContainerObject(line));
        }
        this.parsonAnswerLines = [];
        this.variables = this.QuestionDetails.variables;
        this.dragulaService.createGroup(this.PARSONS_LINES, {});

        this.dragulaService.drop().subscribe((value) => {
            this.determineIndents();
            this.removeLeftContainerIndents();
            this.calculateSourceCode();
        });
    }

    determineIndents(): void {
        const tempParsonLines = this.parsonAnswerLines;
        let count = 0;
        tempParsonLines.forEach(line => {
            const tempLine = line.value.trim();
            line.value = tempLine;
            if (tempLine.charAt(tempLine.length - 1) === '{') {
                line.value = indentString(tempLine, count);
                count++;
            } else if (tempLine.charAt(tempLine.length - 1) === '}') {
                count--;
                line.value = indentString(tempLine, count);
            } else if (count > 0) {
                line.value = indentString(tempLine, count);
            }
        });
    }

    removeLeftContainerIndents(): void {
        const tempParsonLines = this.parsonLines;
        tempParsonLines.forEach(line => {
           line.value = line.value.trim();
        });
    }

    calculateSourceCode(): void {
        this.code = '';
        const tempParsonLines = this.parsonAnswerLines;
        tempParsonLines.forEach(line => {
            this.code += line.value + '\n';
        });
    }

    onSubmit() {
        this.questionService.postQuestionSubmission({question: this.QuestionDetails.id, solution: this.code})
            .subscribe(response => {
                this.messageService.addSuccess('The Question has been Submitted Successfully.');
                this.questionService.getPreviousSubmissions(this.QuestionDetails.id).subscribe(result => {
                    this.previousSubmissions = result;
                });
                console.log(response);
                window.scroll(0, 0);
            }, error => {
                this.messageService.add(error.responseText);
                console.warn(error.responseText);
                console.log({error});
                window.scroll(0, 0);
            });
    }

}
