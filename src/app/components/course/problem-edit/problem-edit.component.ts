import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Question} from '@app/_models';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/_services/api/question.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MessageService} from '@app/_services/message.service';

@Component({
    selector: 'app-problem-edit',
    templateUrl: './problem-edit.component.html',
    styleUrls: ['./problem-edit.component.scss']
})
export class ProblemEditComponent implements OnInit {
    FormData: FormGroup;
    private routeSub: Subscription;
    userId: number;
    questionType: string;
    choiceArray: any[];
    variables: any[];
    correctAnswer: any;
    MultipleChoiceQuestionDetails: Question;
    QuestionDetails: Question;

    constructor(private route: ActivatedRoute,
                private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.FormData = this.formBuilder.group({
            title: new FormControl(''),
            difficulty: new FormControl(''),
            category: new FormControl(''),
            course_name: new FormControl(''),
            event_name: new FormControl(''),
            text: new FormControl(''),
            answer: new FormControl(''),
            visible_distractor_count: new FormControl('3')
        });
        this.routeSub = this.route.params.subscribe(params => {
            this.userId = params.id;
        });
        this.questionService.getQuestion(this.userId).subscribe((detail: Question) => {
            this.QuestionDetails = detail;
            this.questionType = this.questionService.getQuestionType(this.QuestionDetails);

            this.questionService.getMultipleChoiceQuestion(this.userId).subscribe((details: Question) => {
                this.MultipleChoiceQuestionDetails = details;
                this.variables = this.MultipleChoiceQuestionDetails.variables;
                const outputArray = [];
                // tslint:disable-next-line:forin
                for (const element in this.MultipleChoiceQuestionDetails.choices) {
                    outputArray.push({
                        id: element,
                        value: this.MultipleChoiceQuestionDetails.choices[element]
                    });
                    this.choiceArray = outputArray;
                }
                this.correctAnswer = this.choiceArray[this.choiceArray
                    .findIndex(x => x.id === this.MultipleChoiceQuestionDetails.answer)];

                this.FormData.controls.title.setValue(this.QuestionDetails.title);
                this.FormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
                this.FormData.controls.category.setValue(this.QuestionDetails.category_name);
                this.FormData.controls.course_name.setValue(this.QuestionDetails.course_name);
                this.FormData.controls.event_name.setValue(this.QuestionDetails.event_name);
                this.FormData.controls.text.setValue(this.MultipleChoiceQuestionDetails.text);
                this.FormData.controls.answer.setValue(this.correctAnswer.value);

            });
        });
    }

    onSubmit(FormData) {
        this.questionService.putQuestion(FormData, this.userId)
            .subscribe(response => {
                this.messageService.addSuccess('The Question has been Updated Successfully.');
                console.log(response);
            }, error => {
                console.warn(error.responseText);
                console.log({error});
            });
    }

}
