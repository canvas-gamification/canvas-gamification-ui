import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {Category, Course, MESSAGE_TYPES} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {forkJoin} from 'rxjs';
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';
import {CourseEventService} from '@app/_services/api/course/course-event.service';

@Component({
    selector: 'app-parsons-edit-snippet',
    templateUrl: './parsons-edit-snippet.component.html',
    styleUrls: ['./parsons-edit-snippet.component.scss']
})
export class ParsonsEditSnippetComponent implements OnInit {
    @Input() questionDetails;
    parsonsFormData: FormGroup;
    selectedCourse: number;
    selectedEvent: number;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    variables: any[];
    questionText: string;

    constructor(private formBuilder: FormBuilder,
                private questionService: QuestionService,
                private messageService: MessageService,
                private courseService: CourseService,
                private categoryService: CategoryService,
                private problemHelpersService: ProblemHelpersService,
                private courseEventService: CourseEventService) {
    }

    ngOnInit(): void {
        if (this.questionDetails.event) {
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

        this.variables = this.questionDetails?.variables;
        this.questionText = this.questionDetails?.text;
        this.parsonsFormData = this.formBuilder.group({
            title: new FormControl(this.questionDetails?.title),
            difficulty: new FormControl(this.questionDetails?.difficulty),
            category: new FormControl(this.questionDetails?.category),
            course: new FormControl(this?.selectedCourse),
            event: new FormControl(this.selectedEvent),
            junit_template: new FormControl(this.questionDetails?.junit_template),
            lines: new FormControl(this.questionDetails?.lines.join('\n')),
            additional_file_name: new FormControl(this.questionDetails?.additional_file_name),
        });
    }

    courseSelectedEvent(value): void {
        this.courseSelectedById(+value.target.value);
    }

    onSubmit(formData: FormGroup): void {
        const submissionRequest = this.problemHelpersService.createParsonsSubmissionRequest(formData.value, this.variables, this.questionText);
        this.questionService.putParsonsQuestion(submissionRequest, this.questionDetails.id)
            .subscribe(() => {
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'The Question has been Updated Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                console.warn(error.responseText);
                window.scroll(0, 0);
            });
    }

    courseSelectedById(courseId: number): void {
        this.selectedCourse = courseId;
        if (this.courses) {
            this.courses.forEach(course => {
                if (course.id === this.selectedCourse) {
                    this.events = course.events;
                }
            });
            this.selectedEvent = this.questionDetails.event;
            this.parsonsFormData.controls.course.setValue(this.selectedCourse);
            this.parsonsFormData.controls.event.setValue(this.selectedEvent);
        }
    }
}
