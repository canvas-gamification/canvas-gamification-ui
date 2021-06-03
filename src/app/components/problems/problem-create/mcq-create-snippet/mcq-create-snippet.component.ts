import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {Category, Course} from '@app/_models';
import {forkJoin} from 'rxjs';
import {CourseEvent} from '@app/_models/course_event';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';

@Component({
    selector: 'app-mcq-create-snippet',
    templateUrl: './mcq-create-snippet.component.html',
    styleUrls: ['./mcq-create-snippet.component.scss']
})
export class McqCreateSnippetComponent implements OnInit {
    @Input() checkBox: boolean;
    mcqFormData: FormGroup;
    distractors: { text: string }[];
    correctAnswers: { text: string }[];
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    selectedCourse: number;
    variables: JSON[];
    questionText: string;
    answerText: string;

    constructor(private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService,
                private courseService: CourseService,
                private categoryService: CategoryService,
                private problemHelpersService: ProblemHelpersService) {
    }

    ngOnInit(): void {
        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();

        forkJoin([coursesObservable, categoriesObservable]).subscribe(result => {
            this.courses = result[0];
            this.categories = result[1];
        });

        this.distractors = [];
        this.correctAnswers = [];
        this.addChoice();
        this.addAnswer();

        this.mcqFormData = this.formBuilder.group({
            title: new FormControl(''),
            difficulty: new FormControl(''),
            course: new FormControl(''),
            event: new FormControl(''),
            category: new FormControl(''),
            visible_distractor_count: new FormControl(''),
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
        }
    }

    onSubmit(formData: FormGroup): void {
        let submissionRequest;
        if (!this.checkBox) {
            submissionRequest = this.problemHelpersService.createMCQSubmissionRequest(formData.value, this.distractors.map(x => x.text), this.variables, this.questionText, this.answerText);
        } else if (this.checkBox) {
            submissionRequest = this.problemHelpersService.createCheckboxSubmissionRequest(formData.value, this.distractors.map(x => x.text), this.variables, this.questionText, this.correctAnswers.map(x => x.text));
        }
        this.questionService.postMultipleChoiceQuestion(submissionRequest)
            .subscribe(() => {
                this.toastr.success('The Question has been Created Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.toastr.error(error);
                console.warn(error);
                window.scroll(0, 0);
            });
    }


    addChoice(): void {
        this.distractors.push({text: ''});
    }

    removeChoice(index: number): void {
        this.distractors.splice(index, 1)
    }

    addAnswer(): void {
        this.correctAnswers.push({text: ''});
    }

    removeAnswer(index: number): void {
        this.correctAnswers.splice(index, 1);
    }
}
