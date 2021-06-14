import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {forkJoin} from 'rxjs';
import {Category, Course, Question} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {ToastrService} from "ngx-toastr";
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';
import {CourseEventService} from '@app/_services/api/course/course-event.service';

@Component({
    selector: 'app-mcq-edit-snippet',
    templateUrl: './mcq-edit-snippet.component.html',
    styleUrls: ['./mcq-edit-snippet.component.scss']
})
export class McqEditSnippetComponent implements OnInit {
    @Input() questionDetails: Question;
    mcqFormData: FormGroup;
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

    constructor(private courseService: CourseService,
                private categoryService: CategoryService,
                private formBuilder: FormBuilder,
                private questionService: QuestionService,
                private toastr: ToastrService,
                private problemHelpersService: ProblemHelpersService,
                private courseEventService: CourseEventService) {
    }

    ngOnInit(): void {
        // TODO: refactor => typeof this.questionDetails.event === 'number'
        if (this.questionDetails.event && typeof this.questionDetails.event === 'number') {
            const coursesObservable = this.courseService.getCourses();
            const categoriesObservable = this.categoryService.getCategories();
            const eventObservable = this.courseEventService.getCourseEvent(this.questionDetails?.event);

            forkJoin([coursesObservable, categoriesObservable, eventObservable])
                .subscribe(result => {
                    this.courses = result[0];
                    this.categories = result[1];
                    this.courseSelectedById(result[2].course);
                });
        } else {
            const coursesObservable = this.courseService.getCourses();
            const categoriesObservable = this.categoryService.getCategories();

            forkJoin([coursesObservable, categoriesObservable])
                .subscribe(result => {
                    this.courses = result[0];
                    this.categories = result[1];
                });
        }

        this.questionDetails.is_checkbox ? this.convertChoices(true) : this.convertChoices();
        this.variables = this.questionDetails.variables;
        this.questionText = this.questionDetails.text;
        this.mcqFormData = this.formBuilder.group({
            title: new FormControl(this.questionDetails.title),
            difficulty: new FormControl(this.questionDetails.difficulty),
            course: new FormControl(this.selectedCourse),
            event: new FormControl(this.selectedEvent),
            category: new FormControl(this.questionDetails.category),
            variables: new FormControl(''),
            visible_distractor_count: new FormControl(this.questionDetails.visible_distractor_count.toString()),
            is_verified: new FormControl(true),
            choices: new FormControl(''),
        });
    }

    onSubmit(formData: FormGroup): void {
        let submissionRequest;
        if (!this.questionDetails.is_checkbox) {
            submissionRequest = this.problemHelpersService.createMCQSubmissionRequest(formData.value, this.distractors.map(x => x.text), this.variables, this.questionText, this.answerText);
        } else if (this.questionDetails.is_checkbox) {
            submissionRequest = this.problemHelpersService.createCheckboxSubmissionRequest(formData.value, this.distractors.map(x => x.text), this.variables, this.questionText, this.correctAnswers.map(x => x.text));
        }
        this.questionService.putMultipleChoiceQuestion(submissionRequest, this.questionDetails.id)
            .subscribe((result) => {
                if (result.success != false)
                    this.toastr.success('The Question has been Updated Successfully.');
                window.scroll(0, 0);
            });
    }

    courseSelectedEvent(value: Event): void {
        this.courseSelectedById(+(value.target as HTMLInputElement).value);
    }

    courseSelectedById(courseId: number): void {
        this.selectedCourse = courseId;
        if (this.courses) {
            this.courses.forEach(course => {
                if (course.id === this.selectedCourse) {
                    this.events = course.events;
                }
            });
            // TODO: refactor => typeof this.questionDetails.event === 'number'
            if (typeof this.questionDetails.event === 'number')
                this.selectedEvent = this.questionDetails.event;
            this.mcqFormData.controls.course.setValue(this.selectedCourse);
            this.mcqFormData.controls.event.setValue(this.selectedEvent);
        }
    }

    addChoice(): void {
        this.distractors.push({text: ''});
    }

    removeChoice(index: number): void {
        this.distractors.splice(index, 1);
    }

    addAnswer(): void {
        this.correctAnswers.push({text: ''});
    }

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
}
