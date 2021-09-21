import {Component, OnInit} from '@angular/core';
import {Category, ParsonsFile, UQJ} from "@app/_models";
import {UqjService} from "@app/problems/_services/uqj.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {Difficulty} from "@app/_models/difficulty";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {SubmissionService} from "@app/problems/_services/submission.service";
import {ToastrService} from "ngx-toastr";
import {forkJoin} from "rxjs";
import {CourseService} from "@app/course/_services/course.service";
import {CategoryService} from "@app/_services/api/category.service";
import {PracticeDifficultyForm} from "@app/problems/_forms/practice-difficulty.form";
import {ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import {UserStatsService} from "@app/_services/api/user-stats.service";

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
    safeRenderedText: SafeHtml;

    formData: FormGroup;

    // MCQ View Variables
    choiceArray: { id: string, value: string, safeValue: SafeHtml }[];
    checkboxAnswers: string[];
    mcqFormData: FormGroup;
    checkboxFormData: FormGroup;

    // Java View Variables
    inputFileNames = new Array<{ name: string, template: string }>();

    // Parsons View Variables
    files: (ParsonsFile & { solution: string })[]

    // User Stats Variables
    categoryId: number;
    category: Category;
    courseId: number;
    userDifficultyStats: { category: number, difficulty: string, avgSuccess: number }[];

    constructor(private route: ActivatedRoute,
                private uqjService: UqjService,
                private difficultyService: DifficultyService,
                private formBuilder: FormBuilder,
                private sanitizer: DomSanitizer,
                private submissionService: SubmissionService,
                private courseService: CourseService,
                private categoryService: CategoryService,
                private userStatsService: UserStatsService,
                private toastr: ToastrService) {
        this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
        this.courseId = +this.route.snapshot.paramMap.get('courseId');
    }

    /**
     * Get the checkbox form controls as a FormArray.
     */
    get checkboxesArray(): FormArray {
        return this.checkboxFormData.controls.solutions as FormArray;
    }

    ngOnInit(): void {
        this.difficultyFormData = PracticeDifficultyForm.createForm();
        const userStatsObservable = this.userStatsService.getUserDifficultyStats(this.categoryId);
        const categoryObservable = this.categoryService.getCategory(this.categoryId);
        const uqjObservable = this.uqjService.getUQJs();
        const difficultyObservable = this.difficultyService.getDifficulties();

        forkJoin([uqjObservable, difficultyObservable, categoryObservable, userStatsObservable]).subscribe((result) => {
            this.uqjs = result[0].results.filter(uqj => uqj.question.is_practice && uqj.question.category === this.categoryId && !uqj.is_solved);
            this.difficulties = result[1];
            this.category = result[2];
            this.userDifficultyStats = result[3];
            this.filteredUqjs = this.uqjs;
            this.setupCurrentUqj(true);
        });
    }

    /**
     * Skip the current question and move to the next one.
     */
    skipQuestion(): void {
        if (this.filteredUqjs.length === 1) {
            this.previousUqj = null;
            this.currentUqj = this.filteredUqjs[0];
            this.toastr.error('This is the final question available to practice.');
        } else {
            this.setupCurrentUqj(true);
        }
    }

    /**
     * Return to the previous unsolved question.
     */
    previousQuestion(): void {
        if (this.filteredUqjs.length === 1) {
            this.previousUqj = null;
            this.currentUqj = this.filteredUqjs[0];
            this.toastr.error('This is the final question available to practice.');
        } else {
            this.setupCurrentUqj(false);
        }
    }

    /**
     * Apply the difficulty filter to the practice questions.
     */
    applyFilter(): void {
        this.difficultyFormData.value.difficulty === '' ? this.filteredUqjs = this.uqjs : this.filteredUqjs = this.uqjs.filter((uqj) => uqj.question.difficulty === this.difficultyFormData.value.difficulty);
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
            this.safeRenderedText = this.sanitizer.bypassSecurityTrustHtml(this.currentUqj.rendered_text);
            this.loadQuestion(this.currentUqj.question.type_name);
        } else {
            const tempQuestion = this.previousUqj;
            this.currentUqj = this.previousUqj;
            this.previousUqj = tempQuestion;
            this.safeRenderedText = this.sanitizer.bypassSecurityTrustHtml(this.currentUqj.rendered_text);
            this.loadQuestion(this.currentUqj.question.type_name);
        }
    }

    /**
     * Submit a question.
     */
    onSubmit(): void {
        let formData: { question: number, solution: unknown };
        if (this.currentUqj.question.type_name === 'multiple choice question') {
            if (!this.currentUqj.question.is_checkbox) {
                formData = this.mcqFormData.value;
            } else {
                formData = {
                    question: this.checkboxFormData.value.question,
                    solution: this.checkboxAnswers.sort().toString()
                };
            }
        } else if (this.currentUqj.question.type_name === 'java question') {
            const codeSolution = {};
            this.inputFileNames.forEach(file => {
                codeSolution[file.name] = file.template;
            });
            formData = {
                question: this.currentUqj.question.id,
                solution: codeSolution
            };
        } else {
            const solution = {};
            for (const file of this.files) {
                solution[file.name] = file.solution;
            }
            formData = {
                question: this.currentUqj.question.id,
                solution: solution,
            };
        }
        this.submissionService.postQuestionSubmission(formData)
            .subscribe(() => {
                this.toastr.success('The Question has been Submitted Successfully.');
                this.previousUqj = null;
                this.filteredUqjs = this.filteredUqjs.filter((uqj => uqj.id !== this.currentUqj.id));
                this.uqjs = this.uqjs.filter((uqj => uqj.id !== this.currentUqj.id));
                this.setupCurrentUqj(true);
            });
    }

    /**
     * When the state of a checkbox changes (checked/!checked).
     * @param e - The event that is sent on change.
     */
    checkboxChanged(e: Event): void {
        const input = e.target as HTMLInputElement;
        if (input.checked) {
            this.checkboxAnswers.push(input.id);
        } else {
            this.checkboxAnswers.splice(this.checkboxAnswers.findIndex(id => id === input.id), 1);
        }
    }

    /**
     * Setup an MCQ question for practice.
     */
    mcqSetup(): void {
        const outputArray = [];
        for (const choice in this.currentUqj.rendered_choices) {
            outputArray.push({
                id: choice,
                value: this.currentUqj.rendered_choices[choice],
                safeValue: this.sanitizer.bypassSecurityTrustHtml(this.currentUqj.rendered_choices[choice])
            });
            this.choiceArray = outputArray;
        }
        if (!this.currentUqj.is_checkbox) {
            this.mcqFormData = this.formBuilder.group({
                question: new FormControl(this.currentUqj.question.id),
                solution: new FormControl(null, [Validators.required])
            });
        } else {
            this.checkboxAnswers = [];
            this.checkboxFormData = this.formBuilder.group({
                question: new FormControl(this.currentUqj.question.id),
                solutions: new FormArray([])
            });
            this.addCheckboxesToForm();
        }
    }

    /**
     * Load the required variables for the specific question type.
     * @param questionType - The type of question.
     */
    loadQuestion(questionType: string): void {
        if (questionType === 'multiple choice question') {
            this.mcqSetup();
        } else if (questionType === 'java question') {
            this.inputFileNames = this.currentUqj.input_files;
        } else if (questionType === 'parsons question') {
            this.files = this.currentUqj.rendered_lines.map(file => ({
                ...file,
                solution: '',
            }));
        }
    }

    /**
     * Add checkboxes to the form.
     * @private
     */
    private addCheckboxesToForm(): void {
        this.choiceArray.forEach(() => this.checkboxesArray.push(new FormControl(false)));
    }

}
