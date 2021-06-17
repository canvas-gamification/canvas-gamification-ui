import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {ToastrService} from "ngx-toastr";
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {forkJoin} from 'rxjs';
import {CourseEventService} from '@app/_services/api/course/course-event.service';
import {JavaForm} from "@app/problems/_forms/java.form";

@Component({
    selector: 'app-java-edit-snippet',
    templateUrl: './java-edit-snippet.component.html',
    styleUrls: ['./java-edit-snippet.component.scss']
})
export class JavaEditSnippetComponent implements OnInit {
    @Input() questionDetails;
    formGroup: FormGroup;
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
                private courseEventService: CourseEventService) {
    }

    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
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

        this.formGroup = JavaForm.createFormWithData(this.questionDetails, this.selectedEvent, this.selectedCourse);
    }

    /**
     * Form submission.
     */
    onSubmit(): void {
        const submissionRequest = JavaForm.extractData(this.formGroup, this.variables, this.inputFileNames, this.questionText);
        this.questionService.putJavaQuestion(submissionRequest, this.questionDetails.id)
            .subscribe(() => {
                window.scroll(0, 0);
                this.formGroup.reset();
                this.toastr.success('The Question has been updated Successfully.');
            });
    }

    /**
     * Select a course from the given event.
     * @param value - The event.
     */
    courseSelectedEvent(value: Event): void {
        this.courseSelectedById(+(value.target as HTMLInputElement).value);
    }

    /**
     * Select a course.
     * @param courseId - Id of the course to select.
     */
    courseSelectedById(courseId: number): void {
        this.selectedCourse = courseId;
        if (this.courses) {
            this.courses.forEach(course => {
                if (course.id === this.selectedCourse) {
                    this.events = course.events;
                }
            });
            this.selectedEvent = this.questionDetails.event;
            this.form.course.setValue(this.selectedCourse);
            this.form.event.setValue(this.selectedEvent);
        }
    }
}
