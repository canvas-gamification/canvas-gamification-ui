import {Component, OnInit} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {Question} from '@app/_models';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/problems/_services/question.service';

@Component({
    selector: 'app-problem-edit',
    templateUrl: './problem-edit.component.html',
    styleUrls: ['./problem-edit.component.scss'],
})
export class ProblemEditComponent implements OnInit {
    questionId: number;
    questionType: string;
    questionDetails: Question;

    constructor(private route: ActivatedRoute, private questionService: QuestionService) {
    }

    ngOnInit(): void {
        const questionId = this.route.snapshot.params.id;
        const questionDetailsObservable = this.questionService.getQuestion(questionId);

        forkJoin([questionDetailsObservable])
            .subscribe(result => {
                this.questionDetails = result[0];
                this.questionType = this.questionService.getQuestionType(this.questionDetails);
            });
    }
}
