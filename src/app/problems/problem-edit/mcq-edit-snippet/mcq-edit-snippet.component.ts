import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/course/_services/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {forkJoin} from 'rxjs';
import {Category, Course, Question} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/problems/_services/question.service';
import {ToastrService} from "ngx-toastr";
import {CourseEventService} from '@app/course/_services/course-event.service';
import {McqForm} from "@app/problems/_forms/mcq.form";
import {Router} from "@angular/router";

@Component({
    selector: 'app-mcq-edit-snippet',
    templateUrl: './mcq-edit-snippet.component.html',
    styleUrls: ['./mcq-edit-snippet.component.scss'],
})
export class McqEditSnippetComponent implements OnInit {
    @Input() questionDetails: Question;
    formGroup: FormGroup;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    variables: JSON[];
    selectedCourse: number;
    selectedEvent: number;
    distractors: { text: string }[];
    correctAnswers: { text: string }[];
    questionText: string;
    answerText: string;
    isPractice: boolean;

    constructor(private courseService: CourseService,
                private categoryService: CategoryService,
                private formBuilder: FormBuilder,
                private questionService: QuestionService,
                private toastr: ToastrService,
                private courseEventService: CourseEventService,
                private router: Router) {
    }

    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    ngOnInit(): void {
        // TODO: refactor => typeof this.questionDetails.event === 'number'
        if (this.questionDetails.event && typeof this.questionDetails.event === 'number') {
            const coursesObservable = this.courseService.getCourses();
            const categoriesObservable = this.categoryService.getCategories();
            const eventObservable = this.courseEventService.getCourseEvent(this.questionDetails.event);

            forkJoin([coursesObservable, categoriesObservable, eventObservable])
                .subscribe(result => {
                    this.courses = result[0];
                    this.categories = result[1];
                    this.setCourse(result[2].course);
                    this.setEvent(result[2].id);
                    this.isPractice = false;
                });
        } else {
            const coursesObservable = this.courseService.getCourses();
            const categoriesObservable = this.categoryService.getCategories();

            forkJoin([coursesObservable, categoriesObservable])
                .subscribe(result => {
                    this.courses = result[0];
                    this.categories = result[1];
                    this.isPractice = true;
                });
        }

        this.questionDetails.is_checkbox ? this.convertChoices(true) : this.convertChoices();
        this.variables = this.questionDetails.variables;
        this.questionText = this.questionDetails.text;
        this.formGroup = McqForm.createFormWithData(this.questionDetails, this.selectedEvent, this.selectedCourse);
    }

    /**
     * Form submission.
     */
    onSubmit(): void {
        let submissionRequest;
        if (!this.questionDetails.is_checkbox) {
            submissionRequest = McqForm.extractMcqData(this.formGroup, this.distractors.map(x => x.text), this.variables, this.questionText, this.answerText);
        } else if (this.questionDetails.is_checkbox) {
            submissionRequest = McqForm.extractCheckboxData(this.formGroup, this.distractors.map(x => x.text), this.variables, this.questionText, this.correctAnswers.map(x => x.text));
        }
        this.questionService.putMultipleChoiceQuestion(submissionRequest, this.questionDetails.id)
            .subscribe(() => {
                this.refresh();
            });
    }

    /**
     * Select a course from the given DOM event.
     * @param value - The DOM event.
     */
    courseSelectionChanged(value: Event): void {
        this.setCourse(+(value.target as HTMLInputElement).value);
    }

    /**
     * Select a event from the given DOM event.
     * @param value
     */
    eventSelectionChanged(value: Event): void {
        this.setEvent(+(value.target as HTMLInputElement).value);
    }

    /**
     * Set the course.
     * @param courseId - The course's id.
     */
    setCourse(courseId: number): void {
        this.selectedCourse = courseId;
        if (this.courses) {
            this.courses.forEach(course => {
                if (course.id === this.selectedCourse) {
                    this.events = course.events;
                }
            });
            this.setEvent(null);
            this.form.course.setValue(this.selectedCourse);
        }
    }

    /**
     * Set the event.
     * @param event - The event object to set.
     */
    setEvent(event: number): void {
        this.selectedEvent = event;
        this.form.event.setValue(this.selectedEvent);
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
     * Converts choices and correctAnswers into array.
     * @param isCheckbox - Optional parameter if the question is a checkbox question.
     */
    convertChoices(isCheckbox = false): void {
        if (isCheckbox) {
            this.correctAnswers = [];
            this.distractors = [];
            for (const choice in this.questionDetails.choices) {
                if (this.questionDetails.answer.split(',').includes(choice)) {
                    this.correctAnswers.push({text: this.questionDetails.choices[choice]});
                } else {
                    this.distractors.push({text: this.questionDetails.choices[choice]});
                }
            }

        } else {
            this.distractors = [];
            for (const choice in this.questionDetails.choices) {
                if (choice === this.questionDetails.answer)
                    this.answerText = this.questionDetails.choices[choice];
                else
                    this.distractors.push({text: this.questionDetails.choices[choice]});
            }
        }
    }

    /**
     * Keeps track of the state of the practiceCheckbox
     * @param e - The event sent when the checkbox is clicked.
     */
    practiceCheckboxChanged(e: Event): void {
        const input = e.target as HTMLInputElement;
        this.isPractice = input.checked;
        this.form.course.setValue(null);
        this.form.event.setValue(null);
    }

    /**
     * Refresh the page upon successful submission.
     */
    refresh(): void {
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['problems', this.questionDetails.id.toString(), 'edit']).then(() => {
            window.scroll(0, 0);
            this.toastr.success('The Question has been Updated Successfully.');
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
        if (this.questionDetails.is_checkbox) {
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
