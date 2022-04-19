import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UqjService} from "@app/problems/_services/uqj.service";
import {Category, UQJ} from "@app/_models";
import {Difficulty} from "@app/_models/difficulty";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {UserStatsService} from "@app/_services/api/user-stats.service";
import {CourseService} from "@app/course/_services/course.service";
import {CategoryService} from "@app/_services/api/category.service";
import {forkJoin} from "rxjs";
import {UserDifficultyStats} from "@app/_models/user_difficulty_stats";
import * as _ from 'lodash';

@Component({
    selector: 'app-practice-problem',
    templateUrl: './practice-problem.component.html',
    styleUrls: ['./practice-problem.component.scss']
})
export class PracticeProblemComponent implements OnInit {
    readonly categoryId: number;
    readonly courseId: number;

    uqjs: UQJ[];
    currentQuestionId: number;
    cursor = 0;
    category: Category;
    userSuccessRate: number;
    difficulty: string;
    difficulties: Difficulty[];
    userDifficultyStats: UserDifficultyStats[];
    categoryUserSuccessRate: number;
    include_solved = false;

    constructor(
        private route: ActivatedRoute,
        private uqjService: UqjService,
        private difficultyService: DifficultyService,
        private courseService: CourseService,
        private categoryService: CategoryService,
        private userStatsService: UserStatsService,
    ) {
        this.courseId = +this.route.snapshot.paramMap.get('courseId');
        this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
    }

    ngOnInit(): void {
        this.difficulty = null;
        const userStatsObservable = this.userStatsService.getUserDifficultyStats(this.categoryId);
        const categoryObservable = this.categoryService.getCategory(this.categoryId);
        const uqjObservable = this.uqjService.getUQJs({
            filters: {
                category: this.categoryId,
                difficulty: this.difficulty,
                is_solved: this.include_solved ? undefined : false,
                is_verified: true,
                is_practice: true
            }
        });
        const difficultyObservable = this.difficultyService.getDifficulties();
        const categoryStatsObservable = this.courseService.getUserStats(this.courseId, this.categoryId);

        forkJoin([uqjObservable, difficultyObservable, categoryObservable, userStatsObservable, categoryStatsObservable]).subscribe((result) => {
            this.uqjs = _.shuffle(result[0].results);
            this.difficulties = result[1];
            this.category = result[2];
            this.userDifficultyStats = result[3];
            this.categoryUserSuccessRate = result[4].success_rate;
            this.updateCurrentQuestion();
            this.calculateUserSuccessRate();
        });
    }

    /**
     * Skips to the next question in the list by incrementing the cursor.
     */
    nextQuestion(): void {
        this.cursor = (this.cursor + 1) % this.uqjs.length;
        this.updateCurrentQuestion();
    }

    /**
     * Returns to the previous question in the list by decrementing the cursor value.
     */
    prevQuestion(): void {
        this.cursor = (this.cursor + this.uqjs.length - 1) % this.uqjs.length;
        this.updateCurrentQuestion();
    }

    /**
     * Updates the currentQuestionId based on the cursor.
     */
    updateCurrentQuestion(): void {
        this.currentQuestionId = this.uqjs?.[this.cursor]?.question?.id;
    }

    /**
     * Updates the difficulty when an item is selected. Then it gets all the uqjs from the backend that match this new difficulty.
     * Finally, updates the user's success rate based on the selected category.
     * @param difficultyEvent The difficulty that is selected a value is clicked in the select input.
     * @param solvedEvent Whether or not to include solved questions
     */
    updateQuestions(difficultyEvent: string, solvedEvent: boolean): void {
        this.difficulty = difficultyEvent;
        this.include_solved = solvedEvent;
        this.cursor = 0;
        this.uqjService.getUQJs({
            filters: {
                category: this.categoryId,
                difficulty: this.difficulty,
                is_solved: solvedEvent ? undefined : false,
                is_verified: true,
                is_practice: true
            }
        }).subscribe((uqjs) => {
            this.uqjs = _.shuffle(uqjs.results);
            this.updateCurrentQuestion();
            this.calculateUserSuccessRate();
        });
    }

    /**
     * Determines what success rate to show to the user.
     */
    calculateUserSuccessRate(): void {
        const difficultyStats = this.userDifficultyStats.find((stat) => stat.difficulty === this.difficulty);
        if (this.userDifficultyStats.length != 0) {
            if (this.difficulty) {
                this.userSuccessRate = difficultyStats ? difficultyStats.avgSuccess : 0;
            } else {
                this.userSuccessRate = this.categoryUserSuccessRate;
            }
        } else {
            this.userSuccessRate = 0;
        }
    }
}
