import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {ToastrService} from "ngx-toastr";
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {forkJoin} from 'rxjs';
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';
import {CourseEventService} from '@app/_services/api/course/course-event.service';
import {ParsonsForm} from "@app/problems/_forms/parsons-form";

@Component({
    selector: 'app-parsons-edit-snippet',
    templateUrl: './parsons-edit-snippet.component.html',
    styleUrls: ['./parsons-edit-snippet.component.scss']
})
export class ParsonsEditSnippetComponent implements OnInit {
    @Input() questionDetails;
    formGroup: FormGroup;
    selectedCourse: number;
    selectedEvent: number;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    variables: JSON[];
    questionText: string;

    constructor(private formBuilder: FormBuilder,
                private questionService: QuestionService,
                private toastr: ToastrService,
                private courseService: CourseService,
                private categoryService: CategoryService,
                private problemHelpersService: ProblemHelpersService,
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
            const eventObservable = this.courseEventService.getCourseEvent(this.questionDetails.event);

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

        this.variables = this.questionDetails.variables;
        this.questionText = this.questionDetails.text;
        this.formGroup = ParsonsForm.createFormWithData({
            title: this.questionDetails.title,
            difficulty: this.questionDetails.difficulty,
            category: this.questionDetails.category,
            course: this.selectedCourse,
            event: this.selectedEvent,
            junit_template: this.questionDetails?.junit_template,
            lines: this.questionDetails.lines.join('\n'),
            additional_file_name: this.questionDetails.additional_file_name,
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
     * Form submission.
     */
    onSubmit(): void {
        const data = ParsonsForm.extractData(this.formGroup);
        const submissionRequest = this.problemHelpersService.createParsonsSubmissionRequest(data, this.variables, this.questionText);
        this.questionService.putParsonsQuestion(submissionRequest, this.questionDetails.id)
            .subscribe((result) => {
                window.scroll(0, 0);
                this.formGroup.reset();
                if (result.success != false)
                    this.toastr.success('The Question has been updated Successfully.');
            });
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
