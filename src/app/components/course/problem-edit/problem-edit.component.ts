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
    MCQFormData: FormGroup;
    JavaFormData: FormGroup;
    ParsonsFormData: FormGroup;
    private routeSub: Subscription;
    userId: number;
    questionType: string;
    choiceArray: any[];
    variables: any[];
    inputFileNames: any[];
    correctAnswer: any;
    MultipleChoiceQuestionDetails: Question;
    JavaQuestionDetails: Question;
    ParsonsQuestionDetails: Question;
    QuestionDetails: Question;

    constructor(private route: ActivatedRoute,
                private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.userId = params.id;
        });
        this.questionService.getQuestion(this.userId).subscribe((detail: Question) => {
            this.QuestionDetails = detail;
            this.questionType = this.questionService.getQuestionType(this.QuestionDetails);

            if (this.questionType === 'multiple choice question') {
                this.MCQFormData = this.formBuilder.group({
                    title: new FormControl(''),
                    difficulty: new FormControl(''),
                    // category: new FormControl(''),
                    course_name: new FormControl(''),
                    event_name: new FormControl(''),
                    text: new FormControl(''),
                    answer: new FormControl(''),
                    visible_distractor_count: new FormControl('3')
                });
                this.MCQFormData.controls.title.setValue(this.QuestionDetails.title);
                this.MCQFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
                // this.MCQFormData.controls.category.setValue(this.QuestionDetails.category_name);
                this.MCQFormData.controls.course_name.setValue(this.QuestionDetails.course_name);
                this.MCQFormData.controls.event_name.setValue(this.QuestionDetails.event_name);
                this.questionService.getMultipleChoiceQuestion(this.userId).subscribe((details: Question) => {
                    this.MultipleChoiceQuestionDetails = details;
                    this.variables = this.MultipleChoiceQuestionDetails.variables;
                    const outputArray = [];
                    // tslint:disable-next-line:forin
                    for (const choice in this.MultipleChoiceQuestionDetails.choices) {
                        outputArray.push({
                            id: choice,
                            value: this.MultipleChoiceQuestionDetails.choices[choice]
                        });
                        this.choiceArray = outputArray;
                    }
                    this.correctAnswer = this.choiceArray[this.choiceArray
                        .findIndex(x => x.id === this.MultipleChoiceQuestionDetails.answer)];

                    this.MCQFormData.controls.text.setValue(this.MultipleChoiceQuestionDetails.text);
                    this.MCQFormData.controls.answer.setValue(this.correctAnswer.value);

                });
            }

            if (this.questionType === 'java question') {
                this.JavaFormData = this.formBuilder.group({
                    title: new FormControl(''),
                    difficulty: new FormControl(''),
                    // category: new FormControl(''),
                    course_name: new FormControl(''),
                    event_name: new FormControl(''),
                    text: new FormControl(''),
                    answer: new FormControl(''),
                    junit_template: new FormControl(''),
                });
                this.questionService.getJavaQuestion(this.userId).subscribe((details: Question) => {
                    this.JavaQuestionDetails = details;
                    this.inputFileNames = this.JavaQuestionDetails.input_file_names;
                    this.variables = this.JavaQuestionDetails.variables;
                    this.JavaFormData.controls.title.setValue(this.QuestionDetails.title);
                    this.JavaFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
                    // this.JavaFormData.controls.category.setValue(this.QuestionDetails.category_name);
                    this.JavaFormData.controls.course_name.setValue(this.QuestionDetails.course_name);
                    this.JavaFormData.controls.event_name.setValue(this.QuestionDetails.event_name);
                    this.JavaFormData.controls.text.setValue(this.JavaQuestionDetails.text);
                    this.JavaFormData.controls.junit_template.setValue(this.JavaQuestionDetails.junit_template);
                });
            }

            if (this.questionType === 'parsons question') {
                this.ParsonsFormData = this.formBuilder.group({
                    title: new FormControl(''),
                    difficulty: new FormControl(''),
                    // category: new FormControl(''),
                    course_name: new FormControl(''),
                    event_name: new FormControl(''),
                    text: new FormControl(''),
                    junit_template: new FormControl(''),
                    lines: new FormControl(''),
                    additional_file_name: new FormControl(''),
                });
                this.questionService.getParsonsQuestion(this.userId).subscribe((details: Question) => {
                    console.log(this.QuestionDetails);
                    this.ParsonsQuestionDetails = details;
                    this.variables = this.ParsonsQuestionDetails.variables;
                    this.ParsonsFormData.controls.title.setValue(this.QuestionDetails.title);
                    this.ParsonsFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
                    // this.ParsonsFormData.controls.category.setValue(this.QuestionDetails.category_name);
                    this.ParsonsFormData.controls.course_name.setValue(this.QuestionDetails.course_name);
                    this.ParsonsFormData.controls.event_name.setValue(this.QuestionDetails.event_name);
                    this.ParsonsFormData.controls.text.setValue(this.ParsonsQuestionDetails.text);
                    this.ParsonsFormData.controls.junit_template.setValue(this.ParsonsQuestionDetails.junit_template);
                    this.ParsonsFormData.controls.lines.setValue(this.ParsonsQuestionDetails.lines);
                    this.ParsonsFormData.controls.additional_file_name.setValue(this.ParsonsQuestionDetails.additional_file_name);
                });
            }
        });
    }

    onSubmit(FormData) {
        if (this.questionType === 'multiple choice question') {
            this.questionService.putMultipleChoiceQuestion(FormData, this.userId)
                .subscribe(response => {
                    this.messageService.addSuccess('The Question has been Updated Successfully.');
                    console.log(response);
                }, error => {
                    console.warn(error.responseText);
                    console.log({error});
                });
        }
        if (this.questionType === 'java question') {
            this.questionService.putJavaQuestion(FormData, this.userId)
                .subscribe(response => {
                    this.messageService.addSuccess('The Question has been Updated Successfully.');
                    console.log(response);
                }, error => {
                    console.warn(error.responseText);
                    console.log({error});
                });
        }
        if (this.questionType === 'parsons question') {
            this.questionService.putParsonsQuestion(FormData, this.userId)
                .subscribe(response => {
                    this.messageService.addSuccess('The Question has been Updated Successfully.');
                    console.log(response);
                }, error => {
                    console.warn(error.responseText);
                    console.log({error});
                });
        }
    }

}
