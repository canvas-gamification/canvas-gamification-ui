import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/_services/api/question.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-problem-create',
    templateUrl: './problem-create.component.html',
    styleUrls: ['./problem-create.component.scss']
})
export class ProblemCreateComponent implements OnInit {
    private routeSub: Subscription;
    questionType: string;
    constructor(private route: ActivatedRoute, private questionService: QuestionService) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.questionType = params.type;
            console.log(this.questionType);
        });
    }

}
