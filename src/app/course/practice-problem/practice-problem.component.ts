import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UqjService} from '@app/problems/_services/uqj.service';
import {Category, NestedCategories} from '@app/_models';
import {Difficulty} from '@app/_models/difficulty';
import {DifficultyService} from '@app/problems/_services/difficulty.service';
import {UserStatsService} from '@app/_services/api/user-stats.service';
import {CourseService} from '@app/course/_services/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {forkJoin, Subscription} from 'rxjs';
import {UserDifficultyStats} from '@app/_models/user_difficulty_stats';
import * as _ from 'lodash';

@Component({
    selector: 'app-practice-problem',
    templateUrl: './practice-problem.component.html',
    styleUrls: ['./practice-problem.component.scss']
})
export class PracticeProblemComponent implements OnInit, OnDestroy {
    courseId: number;
    categoryId: number;

    uqjs: number[];
    currentQuestionId: number;
    cursor = 0;
    category: Category;
    categories: Category[] = [];
    parentCategory: Category;
    nestedCategories: NestedCategories[] = [];
    userSuccessRate: number;
    difficulty: string;
    difficulties: Difficulty[];
    userDifficultyStats: UserDifficultyStats[];
    categoryUserSuccessRate: number;
    include_solved = false;
    displayCategorySidebar = false;

    subscriptions: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private uqjService: UqjService,
        private difficultyService: DifficultyService,
        private courseService: CourseService,
        private categoryService: CategoryService,
        private userStatsService: UserStatsService,
    ) {
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.categoryService.getCategories().subscribe(categories => {
                this.categories = categories;
                this.nestedCategories = categories.reduce((previous, category) => {
                    if (category.parent) return previous;
                    return [...previous, {
                        category,
                        children: categories.filter(nestedCategory => nestedCategory.parent === category.pk).map(nestedCategory => {
                            return {
                                category: nestedCategory,
                                children: [],
                            };
                        })
                    }];
                }, []);

                this.subscriptions.add(
                    this.route.paramMap.subscribe(paramMap => {
                        this.courseId = Number.parseInt(paramMap.get('courseId'));
                        this.categoryId = Number.parseInt(paramMap.get('categoryId'));
                        this.category = categories.find(category => this.categoryId === category.pk);
                        this.parentCategory = categories.find(category => this.category.parent === category.pk);
                        this.cursor = 0;
                        this.uqjs = undefined;

                        const userStatsObservable = this.userStatsService.getUserDifficultyStats(this.categoryId);
                        const uqjObservable = this.uqjService.getUQJQuestionIds({
                            category: this.parentCategory ? this.categoryId : undefined,
                            parent_category: this.parentCategory?.pk ?? this.categoryId,
                            difficulty: this.difficulty,
                            is_solved: this.include_solved ? undefined : false,
                            is_practice: true
                        });
                        const difficultyObservable = this.difficultyService.getDifficulties();
                        const categoryStatsObservable = this.courseService.getUserStats(this.courseId, this.categoryId);

                        this.subscriptions.add(
                            forkJoin([
                                uqjObservable,
                                difficultyObservable,
                                userStatsObservable,
                                categoryStatsObservable
                            ]).subscribe(([uqjs, difficulties, difficultyStats, userSuccessRate]) => {
                                this.uqjs = _.shuffle(uqjs);
                                this.difficulties = difficulties;
                                this.userDifficultyStats = difficultyStats;
                                this.categoryUserSuccessRate = userSuccessRate.success_rate;
                                this.updateCurrentQuestion();
                                this.calculateUserSuccessRate();
                            })
                        );
                    })
                );
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
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
        this.currentQuestionId = this.uqjs[this.cursor];
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
        this.subscriptions.add(
            this.uqjService.getUQJQuestionIds({
                category: this.parentCategory ? this.categoryId : undefined,
                parent_category: this.parentCategory?.pk ?? this.categoryId,
                difficulty: this.difficulty,
                is_solved: solvedEvent ? undefined : false,
                is_practice: true
            }).subscribe((uqjs) => {
                this.uqjs = _.shuffle(uqjs);
                this.updateCurrentQuestion();
                this.calculateUserSuccessRate();
            })
        );
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
