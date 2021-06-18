import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {QuestionService} from "@app/problems/_services/question.service";

@Component({
    selector: 'app-problem-create',
    templateUrl: './problem-create.component.html',
    styleUrls: ['./problem-create.component.scss'],
    providers: [QuestionService]
})
export class ProblemCreateComponent implements OnInit {

    private routeSub: Subscription;
    questionType: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.questionType = params.type;
        });
    }
}
