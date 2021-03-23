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

    constructor(private route: ActivatedRoute, private questionService: QuestionService, private dragulaService: DragulaService) {
    }

    private routeSub: Subscription;
    QuestionDetails: Question;
    questionId: number;
    questionType: string;
    inputFileNames: any[];


    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.questionId = params.id;
        });

        this.questionService.getQuestion(this.questionId).subscribe((details) => {
            this.QuestionDetails = details;
            this.questionType = this.questionService.getQuestionType(this.QuestionDetails);
        });
    }
}
