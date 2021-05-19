import {Component, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MessageService} from '@app/_services/message.service';
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {Category, Course, MESSAGE_TYPES} from '@app/_models';
import {forkJoin} from 'rxjs';
import {CourseEvent} from '@app/_models/course_event';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';

@Component({
    selector: 'app-mcq-create-snippet',
    templateUrl: './mcq-create-snippet.component.html',
    styleUrls: ['./mcq-create-snippet.component.scss']
})
export class McqCreateSnippetComponent implements OnInit {
    mcqFormData: FormGroup;
    distract: FormArray;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    selectedCourse: number;
    variables: JSON[];
    questionText: string;
    answerText: string;

    constructor(private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private messageService: MessageService,
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

        this.distract = new FormArray([]);

        this.mcqFormData = this.formBuilder.group({
            title: new FormControl(''),
            difficulty: new FormControl(''),
            course: new FormControl(''),
            event: new FormControl(''),
            category: new FormControl(''),
            choices: new FormControl(''),
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
        const submissionRequest = this.problemHelpersService.createMCQSubmissionRequest(formData.value, this.distract, this.variables, this.questionText, this.answerText);
        this.questionService.postMultipleChoiceQuestion(submissionRequest)
            .subscribe(() => {
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'The Question has been Created Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                console.warn(error.responseText);
                window.scroll(0, 0);
            });
    }


    addChoice(): void {
        this.distract.push(new FormControl(''));
    }

    removeChoice(index: number): void {
        this.distract.removeAt(index);
    }
}
