import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/_services/api/question.service';
import {Subscription} from 'rxjs';
import {Question} from '@app/_models';
import {DragulaService} from 'ng2-dragula';
import {QuestionSubmission} from '@app/_models/questionSubmission';

@Component({
    selector: 'app-problem-view',
    templateUrl: './problem-view.component.html',
    styleUrls: ['./problem-view.component.scss']
})
export class ProblemViewComponent implements OnInit {
    PARSONS_LINES = 'PARSONS_LINES';
    private routeSub: Subscription;
    MultipleChoiceQuestionDetails: Question;
    JavaQuestionDetails: Question;
    ParsonsQuestionDetails: Question;
    QuestionDetails: Question;
    userId: number;
    questionType: string;
    choiceArray: any[];
    variables: any[];
    inputFileNames: any[];
    parsonLines: any[];
    parsonAnswerLines: any[];
    previousSubmissions: QuestionSubmission[];

    parsonSub = new Subscription();

    constructor(private route: ActivatedRoute, private questionService: QuestionService, private dragulaService: DragulaService) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.userId = params.id;
        });

        this.questionService.getQuestion(this.userId).subscribe((details) => {
            this.QuestionDetails = details;
            this.questionType = this.questionService.getQuestionType(this.QuestionDetails);
            this.questionService.getPreviousSubmissions(this.QuestionDetails.id).subscribe((submission: QuestionSubmission[]) => {
               this.previousSubmissions = submission;
            });
            if (this.questionType === 'multiple choice question') {
                this.questionService.getMultipleChoiceQuestion(this.userId).subscribe((detail: Question) => {
                    this.MultipleChoiceQuestionDetails = detail;
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
                });
            }
            if (this.questionType === 'java question') {
                this.questionService.getJavaQuestion(this.userId).subscribe((detail: Question) => {
                    this.JavaQuestionDetails = detail;
                    this.inputFileNames = this.JavaQuestionDetails.input_file_names;
                    this.variables = this.JavaQuestionDetails.variables;
                });
            }
            if (this.questionType === 'parsons question') {
                this.questionService.getParsonsQuestion(this.userId).subscribe((detail: Question) => {
                    this.ParsonsQuestionDetails = detail;
                    this.parsonLines = this.ParsonsQuestionDetails.lines;
                    this.variables = this.ParsonsQuestionDetails.variables;
                    this.parsonSub.add(this.dragulaService.dropModel(this.PARSONS_LINES)
                        .subscribe(({el, target, source, sourceModel, targetModel, item}) => {
                            console.log('dropModel:');
                            console.log(el);
                            console.log(source);
                            console.log(target);
                            console.log(sourceModel);
                            console.log(targetModel);
                            console.log(item);
                        })
                    );
                });
            }

        });
    }
}
