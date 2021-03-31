import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/_services/api/question.service';
import {forkJoin, Subscription} from 'rxjs';
import {Question, UQJ} from '@app/_models';
import {UqjService} from '@app/_services/api/uqj.service';

@Component({
    selector: 'app-problem-view',
    templateUrl: './problem-view.component.html',
    styleUrls: ['./problem-view.component.scss']
})
export class ProblemViewComponent implements OnInit {

    constructor(private route: ActivatedRoute, private uqjService: UqjService, private questionService: QuestionService) {
    }

    private routeSub: Subscription;
    UQJDetails: UQJ;
    QuestionDetails: Question;
    questionId: number;
    questionType: string;
    inputFileNames: any[];


    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.questionId = params.id;
        });
        const uqjObservable = this.uqjService.getUQJByQuestion(this.questionId);
        const questionObservable = this.questionService.getQuestion(this.questionId);
        forkJoin([uqjObservable, questionObservable]).subscribe(result => {
            this.UQJDetails = result[0];
            this.QuestionDetails = result[1];
            this.questionType = this.questionService.getQuestionType(this.QuestionDetails);
        });
    }
}
