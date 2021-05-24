import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {ToastrService} from "ngx-toastr";
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {forkJoin} from 'rxjs';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';
import {CourseEventService} from '@app/_services/api/course/course-event.service';

@Component({
    selector: 'app-java-edit-snippet',
    templateUrl: './java-edit-snippet.component.html',
    styleUrls: ['./java-edit-snippet.component.scss']
})
export class JavaEditSnippetComponent implements OnInit {
    @Input() questionDetails;
    javaFormData: FormGroup;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    variables: JSON[];
    selectedCourse: number;
    selectedEvent: number;
    inputFileNames: JSON;
    questionText: string;

    constructor(private courseService: CourseService,
                private categoryService: CategoryService,
                private formBuilder: FormBuilder,
                private questionService: QuestionService,
                private toastr: ToastrService,
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

        this.inputFileNames = this.questionDetails?.input_file_names;
        this.variables = this.questionDetails?.variables;
        this.questionText = this.questionDetails?.text;

        this.javaFormData = this.formBuilder.group({
            title: new FormControl(this.questionDetails?.title),
            difficulty: new FormControl(this.questionDetails?.difficulty),
            category: new FormControl(this.questionDetails?.category),
            course: new FormControl(this.selectedCourse),
            event: new FormControl(this.selectedEvent),
            junit_template: new FormControl(this.questionDetails?.junit_template),
        });
    }

    onSubmit(formData: FormGroup): void {
        const submissionRequest = this.problemHelpersService.createJavaSubmissionRequest(formData.value, this.variables, this.inputFileNames, this.questionText);
        this.questionService.putJavaQuestion(submissionRequest, this.questionDetails.id)
            .subscribe(() => {
                this.toastr.success('The Question has been Updated Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.toastr.error(error);
                console.warn(error);
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
            this.selectedEvent = this.questionDetails.event;
            this.javaFormData.controls.course.setValue(this.selectedCourse);
            this.javaFormData.controls.event.setValue(this.selectedEvent);
        }
    }
}
