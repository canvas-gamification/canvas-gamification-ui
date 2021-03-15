import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Course, Question} from '@app/_models';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/_services/api/question.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MessageService} from '@app/_services/message.service';
import {CourseService} from '@app/_services/api/course.service';

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
    courses: Course[];
    events: Event[];
    correctAnswer: any;
    MultipleChoiceQuestionDetails: Question;
    JavaQuestionDetails: Question;
    ParsonsQuestionDetails: Question;
    QuestionDetails: Question;

    constructor(private route: ActivatedRoute,
                private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private messageService: MessageService,
                private courseService: CourseService) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.userId = params.id;
        });
        this.questionService.getQuestion(this.userId).subscribe((detail: Question) => {
            this.QuestionDetails = detail;
            this.questionType = this.questionService.getQuestionType(this.QuestionDetails);
            this.courseService.getCourses().subscribe((course) => {
                this.courses = course;
            });
            if (this.questionType === 'multiple choice question') {
                this.MCQFormData = this.formBuilder.group({
                    title: new FormControl(''),
                    difficulty: new FormControl(''),
                    course: new FormControl(''),
                    event: new FormControl(''),
                    text: new FormControl(''),
                    answer: new FormControl(''),
                    category: new FormControl(''),
                    variables: new FormControl(''),

                    // Hard coded for now...
                    author: new FormControl(1),
                    visible_distractor_count: new FormControl('3'),
                    max_submission_allowed: new FormControl(3),
                    is_verified: new FormControl(true),
                    // choices: new FormControl(''),
                });
                this.MCQFormData.controls.title.setValue(this.QuestionDetails.title);
                this.MCQFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
                this.MCQFormData.controls.category.setValue(this.QuestionDetails.category_name);
                // Hard coded till event api is implemented.
                this.MCQFormData.controls.course.setValue(1);
                this.MCQFormData.controls.event.setValue(this.QuestionDetails.event_name);
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
                    // this.MCQFormData.controls.choices.setValue(this.choiceArray);
                });
            }

            if (this.questionType === 'java question') {
                this.JavaFormData = this.formBuilder.group({
                    title: new FormControl(''),
                    difficulty: new FormControl(''),
                    category: new FormControl(''),
                    course: new FormControl(''),
                    event: new FormControl(''),
                    text: new FormControl(''),
                    junit_template: new FormControl(''),
                    input_file_names: new FormControl(''),
                    variables: new FormControl(''),

                    // Hard coded for now...
                    author: new FormControl(1),
                    max_submission_allowed: new FormControl(5),
                    is_verified: new FormControl(true),
                });
                this.questionService.getJavaQuestion(this.userId).subscribe((details: Question) => {
                    this.JavaQuestionDetails = details;
                    this.inputFileNames = this.JavaQuestionDetails.input_file_names;
                    this.variables = this.JavaQuestionDetails.variables;
                    this.JavaFormData.controls.title.setValue(this.QuestionDetails.title);
                    this.JavaFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
                    this.JavaFormData.controls.category.setValue(this.QuestionDetails.category_name);
                    // Hard coded till event api is implemented.
                    this.JavaFormData.controls.course.setValue(1);
                    this.JavaFormData.controls.event.setValue(this.QuestionDetails.event_name);
                    this.JavaFormData.controls.text.setValue(this.JavaQuestionDetails.text);
                    this.JavaFormData.controls.junit_template.setValue(this.JavaQuestionDetails.junit_template);
                });
            }

            if (this.questionType === 'parsons question') {
                this.ParsonsFormData = this.formBuilder.group({
                    title: new FormControl(''),
                    difficulty: new FormControl(''),
                    category: new FormControl(''),
                    course: new FormControl(''),
                    event: new FormControl(''),
                    text: new FormControl(''),
                    junit_template: new FormControl(''),
                    lines: new FormControl(''),
                    additional_file_name: new FormControl(''),

                    // Hard coded for now...
                    author: new FormControl(1),
                    max_submission_allowed: new FormControl(100),
                    is_verified: new FormControl(true),
                });
                this.questionService.getParsonsQuestion(this.userId).subscribe((details: Question) => {
                    this.ParsonsQuestionDetails = details;
                    this.variables = this.ParsonsQuestionDetails.variables;
                    this.ParsonsFormData.controls.title.setValue(this.QuestionDetails.title);
                    this.ParsonsFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
                    this.ParsonsFormData.controls.category.setValue(this.QuestionDetails.category_name);
                    // Hard coded till event api is implemented.
                    this.ParsonsFormData.controls.course.setValue(1);
                    this.ParsonsFormData.controls.event.setValue(this.QuestionDetails.event_name);
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
