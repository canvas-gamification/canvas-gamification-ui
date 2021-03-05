import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/_services/api/question.service';
import {Subscription} from 'rxjs';
import {Question} from '@app/_models';

@Component({
    selector: 'app-problem-view',
    templateUrl: './problem-view.component.html',
    styleUrls: ['./problem-view.component.scss']
})
export class ProblemViewComponent implements OnInit {
    private routeSub: Subscription;
    MultipleChoiceQuestionDetails: Question;
    JavaQuestionDetails: Question;
    ParsonsQuestionDetails: Question;
    QuestionDetails: Question;
    userId: number;
    questionType: string;
    choiceArray: any[];
    variables: any[];

    constructor(private route: ActivatedRoute, private questionService: QuestionService) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.userId = params.id;
        });

        this.questionService.getQuestion(this.userId).subscribe((details) => {
            this.QuestionDetails = details;
            this.questionType = this.questionService.getQuestionType(this.QuestionDetails);
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
                });
            }
            if (this.questionType === 'parsons question') {
                this.questionService.getParsonsQuestion(this.userId).subscribe((detail: Question) => {
                    this.ParsonsQuestionDetails = detail;
                });
            }

        });
    }
}
