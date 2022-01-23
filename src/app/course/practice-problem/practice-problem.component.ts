import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UqjService} from "@app/problems/_services/uqj.service";
import {UQJ} from "@app/_models";
import {Difficulty} from "@app/_models/difficulty";

@Component({
    selector: 'app-practice-problem',
    templateUrl: './practice-problem.component.html',
    styleUrls: ['./practice-problem.component.scss']
})
export class PracticeProblemComponent implements OnInit {
    private categoryId: number
    private difficulty: Difficulty

    uqjs: UQJ[]
    currentQuestionId: number
    cursor = 0

    constructor(
        private route: ActivatedRoute,
        private uqjService: UqjService,
    ) {
        this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
    }

    ngOnInit(): void {
        this.uqjService.getUQJs({
            filters: {
                category: this.categoryId,
                difficulty: this.difficulty,
                is_solved: false,
            }
        }).subscribe(uqjs => {
            this.uqjs = uqjs.results;
            this.updateCurrentQuestion();
        });
    }

    nextQuestion(): void {
        this.cursor = (this.cursor + 1) % this.uqjs.length;
        this.updateCurrentQuestion();
    }

    prevQuestion(): void {
        this.cursor = (this.cursor + this.uqjs.length - 1) % this.uqjs.length;
        this.updateCurrentQuestion();
    }

    updateCurrentQuestion(): void {
        this.currentQuestionId = this.uqjs?.[this.cursor]?.question?.id;
    }
}
