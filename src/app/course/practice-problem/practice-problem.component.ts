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

@Component({
    selector: 'app-practice-problem',
    templateUrl: './practice-problem.component.html',
    styleUrls: ['./practice-problem.component.scss']
})
export class PracticeProblemComponent implements OnInit {
    readonly categoryId: number
    readonly courseId: number;

    uqjs: UQJ[]
    currentQuestionId: number
    cursor = 0
    category: Category;
    userSuccessRate: number;
    difficulty: string;
    difficulties: Difficulty[];

    private userDifficultyStats: UserDifficultyStats[];
    private categoryUserSuccessRate: number;

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
        this.difficulty = '';
        const userStatsObservable = this.userStatsService.getUserDifficultyStats(this.categoryId);
        const categoryObservable = this.categoryService.getCategory(this.categoryId);
        const uqjObservable = this.uqjService.getUQJs({
            filters: {
                category: this.categoryId,
                difficulty: this.difficulty,
                is_solved: false,
            }
        });
        const difficultyObservable = this.difficultyService.getDifficulties();
        const categoryStatsObservable = this.courseService.getUserStats(this.courseId, this.categoryId);

        forkJoin([uqjObservable, difficultyObservable, categoryObservable, userStatsObservable, categoryStatsObservable]).subscribe((result) => {
            this.uqjs = result[0].results;
            this.difficulties = result[1];
            this.category = result[2];
            this.userDifficultyStats = result[3];
            this.categoryUserSuccessRate = result[4].success_rate;
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

    /**
     * Determines what success rate to show to the user.
     */
    calculateUserSuccessRate(): void {
        if (this.userDifficultyStats.length != 0) {
            if (this.difficulty === "EASY") {
                this.userSuccessRate = this.userDifficultyStats.find((stat) => stat.difficulty === this.difficulty).avgSuccess;
            } else if (this.difficulty === "MEDIUM") {
                this.userSuccessRate = this.userDifficultyStats.find((stat) => stat.difficulty === this.difficulty).avgSuccess;
            } else if (this.difficulty === "HARD") {
                this.userSuccessRate = this.userDifficultyStats.find((stat) => stat.difficulty === this.difficulty).avgSuccess;
            } else if (this.difficulty === '') {
                this.userSuccessRate = this.categoryUserSuccessRate;
            } else {
                this.userSuccessRate = 0;
            }
        } else {
            this.userSuccessRate = 0;
        }
    }
}
