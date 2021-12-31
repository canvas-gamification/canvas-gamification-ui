import {Component, Inject, OnInit} from '@angular/core';
import {Category, UQJ} from "@app/_models";
import {UqjService} from "@app/problems/_services/uqj.service";
import {FormGroup} from "@angular/forms";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {Difficulty} from "@app/_models/difficulty";
import {forkJoin} from "rxjs";
import {CourseService} from "@app/course/_services/course.service";
import {CategoryService} from "@app/_services/api/category.service";
import {PracticeDifficultyForm} from "@app/problems/_forms/practice-difficulty.form";
import {ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import {UserStatsService} from "@app/_services/api/user-stats.service";
import {UserDifficultyStats} from "@app/_models/user_difficulty_stats";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

@Component({
    selector: 'app-problem-practice',
    templateUrl: './problem-practice.component.html',
    styleUrls: ['./problem-practice.component.scss']
})
export class ProblemPracticeComponent implements OnInit {
    // Problem Practice Variables
    difficultyFormData: FormGroup;
    uqjs: UQJ[];
    filteredUqjs: UQJ[];
    currentUqj: UQJ = null;
    previousUqj: UQJ = null;
    difficulties: Difficulty[];

    formData: FormGroup;

    // User Stats Variables
    categoryId: number;
    category: Category;
    courseId: number;
    userDifficultyStats: UserDifficultyStats[];
    userSuccessRate: number;
    categoryUserSuccessRate: number;

    constructor(private route: ActivatedRoute,
                private uqjService: UqjService,
                private difficultyService: DifficultyService,
                private courseService: CourseService,
                private categoryService: CategoryService,
                private userStatsService: UserStatsService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
        this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
        this.courseId = +this.route.snapshot.paramMap.get('courseId');
        this.difficultyFormData = PracticeDifficultyForm.createForm();
    }

    ngOnInit(): void {
        const userStatsObservable = this.userStatsService.getUserDifficultyStats(this.categoryId);
        const categoryObservable = this.categoryService.getCategory(this.categoryId);
        const uqjObservable = this.uqjService.getUQJs();
        const difficultyObservable = this.difficultyService.getDifficulties();
        const categoryStatsObservable = this.courseService.getUserStats(this.courseId, this.categoryId);

        forkJoin([uqjObservable, difficultyObservable, categoryObservable, userStatsObservable, categoryStatsObservable]).subscribe((result) => {
            this.uqjs = result[0].results.filter(uqj => uqj.question.is_practice && uqj.question.category === this.categoryId && !uqj.is_solved);
            this.difficulties = result[1];
            this.category = result[2];
            this.userDifficultyStats = result[3];
            this.categoryUserSuccessRate = result[4].success_rate;
            this.filteredUqjs = this.uqjs;
            this.applyFilter();
        });
    }

    /**
     * Skip the current question and move to the next one.
     */
    skipQuestion(skipEvent: boolean): void {
        if (skipEvent) {
            if (this.filteredUqjs.length === 1) {
                this.previousUqj = null;
                this.currentUqj = this.filteredUqjs[0];
                this.notificationsService
                    .show('This is the final question available to practice.', {
                        status: TuiNotification.Success
                    }).subscribe();
            } else {
                this.setupCurrentUqj(true);
            }
        }
    }

    /**
     * Return to the previous unsolved question.
     */
    previousQuestion(previousEvent: boolean): void {
        if (previousEvent) {
            if (this.filteredUqjs.length === 1) {
                this.previousUqj = null;
                this.currentUqj = this.filteredUqjs[0];
                this.notificationsService
                    .show('This is the final question available to practice.', {
                        status: TuiNotification.Success
                    }).subscribe();
            } else {
                this.setupCurrentUqj(false);
            }
        }
    }

    /**
     * Apply the difficulty filter to the practice questions.
     */
    applyFilter(): void {
        this.difficultyFormData.value.difficulty === '' ? this.filteredUqjs = this.uqjs : this.filteredUqjs = this.uqjs.filter((uqj) => uqj.question.difficulty === this.difficultyFormData.value.difficulty);
        this.calculateUserSuccessRate();
        if (this.filteredUqjs.length) {
            this.setupCurrentUqj(true);
        } else {
            this.currentUqj = undefined;
        }
    }

    /**
     * Prepare the current uqj
     */
    setupCurrentUqj(nextQuestion: boolean): void {
        if (nextQuestion) {
            this.previousUqj = this.currentUqj;
            this.currentUqj = _.sample(this.filteredUqjs);
            while (this.previousUqj === this.currentUqj) {
                this.currentUqj = _.sample(this.filteredUqjs);
            }
        } else {
            const tempQuestion = this.previousUqj;
            this.currentUqj = this.previousUqj;
            this.previousUqj = tempQuestion;
        }
    }

    /**
     * Handles what happens after an event is submitted.
     * @param submissionEvent - A value returned from the child component.
     */
    onSubmit(submissionEvent: boolean): void {
        if (submissionEvent) {
            this.previousUqj = null;
            this.filteredUqjs = this.filteredUqjs.filter((uqj => uqj.id !== this.currentUqj.id));
            this.uqjs = this.uqjs.filter((uqj => uqj.id !== this.currentUqj.id));
            this.setupCurrentUqj(true);
        }
    }


    /**
     * Determines what success rate to show to the user.
     */
    calculateUserSuccessRate(): void {
        if (this.userDifficultyStats.length != 0) {
            if (this.difficultyFormData.value.difficulty === "EASY") {
                this.userSuccessRate = this.userDifficultyStats.find((stat) => stat.difficulty === this.difficultyFormData.value.difficulty).avgSuccess;
            } else if (this.difficultyFormData.value.difficulty === "NORMAL") {
                this.userSuccessRate = this.userDifficultyStats.find((stat) => stat.difficulty === this.difficultyFormData.value.difficulty).avgSuccess;
            } else if (this.difficultyFormData.value.difficulty === "HARD") {
                this.userSuccessRate = this.userDifficultyStats.find((stat) => stat.difficulty === this.difficultyFormData.value.difficulty).avgSuccess;
            } else if (this.difficultyFormData.value.difficulty === '') {
                this.userSuccessRate = this.categoryUserSuccessRate;
            } else {
                this.userSuccessRate = 0;
            }
        } else {
            this.userSuccessRate = 0;
        }
    }
}
