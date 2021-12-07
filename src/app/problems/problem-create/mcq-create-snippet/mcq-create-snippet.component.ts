import {Component, Inject, Input, OnInit} from '@angular/core';
import {QuestionService} from '@app/problems/_services/question.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {CourseService} from '@app/course/_services/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {Category, Course} from '@app/_models';
import {forkJoin} from 'rxjs';
import {CourseEvent} from '@app/_models/course_event';
import {McqForm} from "@app/problems/_forms/mcq.form";
import {Router} from "@angular/router";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {Difficulty} from "@app/_models/difficulty";
import {TuiSelectStringifyService} from "@app/_helpers/tui-select-stringify";

@Component({
    selector: 'app-mcq-create-snippet',
    templateUrl: './mcq-create-snippet.component.html',
    styleUrls: ['./mcq-create-snippet.component.scss'],
})
export class McqCreateSnippetComponent implements OnInit {
    @Input() checkBox: boolean;
    formGroup: FormGroup;
    distractors: { text: string }[];
    correctAnswers: { text: string }[];
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    difficulties: Difficulty[];
    variables: JSON[];
    questionText: string;
    answerText: string;
    returnUrl: string[];
    isPractice = false;

    constructor(private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private courseService: CourseService,
                private categoryService: CategoryService,
                private difficultyService: DifficultyService,
                private router: Router,
                public tuiSelectStringifyService: TuiSelectStringifyService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    ngOnInit(): void {
        this.formGroup = McqForm.createForm();

        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();
        const difficultyObservable = this.difficultyService.getDifficulties();

        forkJoin([coursesObservable, categoriesObservable, difficultyObservable]).subscribe(result => {
            this.courses = result[0];
            this.categories = result[1];
            this.difficulties = result[2];
        });

        this.distractors = [];
        this.correctAnswers = [];
        this.addChoice();
        this.addAnswer();

        this.form.event.disable();
        this.form.course.valueChanges.subscribe((courseId) => {
            if (courseId) this.setCourseEvents(courseId);
            else {
                this.form.event.setValue(null);
                this.form.event.disable();
            }
        });
    }

    setCourseEvents(courseId: number): void {
        this.courses.forEach(course => {
            if (course.id === courseId) {
                this.events = course.events;
                this.form.event.enable();
                return;
            }
        });
    }

    /**
     * Form submission.
     */
    onSubmit(): void {
        let submissionRequest;
        if (!this.checkBox) {
            submissionRequest = McqForm.extractMcqData(this.formGroup, this.distractors.map(x => x.text), this.variables, this.questionText, this.answerText);
            this.returnUrl = ['problems', 'create', 'MCQ'];
        } else if (this.checkBox) {
            submissionRequest = McqForm.extractCheckboxData(this.formGroup, this.distractors.map(x => x.text), this.variables, this.questionText, this.correctAnswers.map(x => x.text));
            this.returnUrl = ['problems', 'create', 'checkbox'];
        }
        this.questionService.postMultipleChoiceQuestion(submissionRequest)
            .subscribe(() => {
                this.refresh();
            });
    }

    /**
     * Add new distractor.
     */
    addChoice(): void {
        this.distractors.push({text: ''});
    }

    /**
     * Remove a distractor.
     * @param index - Distractor to remove.
     */
    removeChoice(index: number): void {
        this.distractors.splice(index, 1);
    }

    /**
     * Add a new answer.
     */
    addAnswer(): void {
        this.correctAnswers.push({text: ''});
    }

    /**
     * Remove an answer.
     * @param index - Answer to remove.
     */
    removeAnswer(index: number): void {
        this.correctAnswers.splice(index, 1);
    }

    /**
     * Refresh the page upon successful submission.
     */
    refresh(): void {
        this.notificationsService
            .show('The Question has been Created Successfully.', {
                status: TuiNotification.Success
            }).subscribe();
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(this.returnUrl).then(() => {
            window.scroll(0, 0);
        });
    }

    /**
     * Check to see if values not in the formGroup are valid.
     */
    isFormGroupValid(): boolean {
        if (this.isPractice) {
            return this.form.course.value === null && this.form.event.value === null;
        } else {
            return this.form.course.value !== null && this.form.event.value !== null;
        }
    }

    /**
     * Check to see if the choices are valid.
     */
    isChoicesValid(): boolean {
        if (this.checkBox) {
            return this.correctAnswers !== [] && this.distractors !== [];
        } else {
            return this.answerText !== '' && this.distractors !== [];
        }
    }

    /**
     * Check to see if questionText is valid.
     */
    isQuestionValid(): boolean {
        return this.questionText !== '';
    }

    /**
     * Combines the validity checks into a single method.
     */
    isSubmissionValid(): boolean {
        return this.isFormGroupValid() && this.isChoicesValid() && this.isQuestionValid();
    }
}
