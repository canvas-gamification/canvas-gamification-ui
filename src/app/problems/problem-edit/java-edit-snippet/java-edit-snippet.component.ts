import {Component, Inject, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/course/_services/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/problems/_services/question.service';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {forkJoin} from 'rxjs';
import {CourseEventService} from '@app/course/_services/course-event.service';
import {JavaForm} from "@app/problems/_forms/java.form";
import {Router} from "@angular/router";
import * as _ from 'lodash';
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

@Component({
    selector: 'app-java-edit-snippet',
    templateUrl: './java-edit-snippet.component.html',
    styleUrls: ['./java-edit-snippet.component.scss'],
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
    inputFiles: JSON;
    questionText: string;
    isPractice: boolean;

    constructor(private courseService: CourseService,
                private categoryService: CategoryService,
                private formBuilder: FormBuilder,
                private questionService: QuestionService,
                private courseEventService: CourseEventService,
                private router: Router,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    ngOnInit(): void {
        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();

        forkJoin([coursesObservable, categoriesObservable])
            .subscribe(result => {
                this.courses = result[0];
                this.categories = result[1];
                if (this.questionDetails.event) {
                    this.isPractice = false;
                    this.setEvent(this.questionDetails.event);
                    this.setCourse(this.questionDetails.event_obj.course);
                } else {
                    this.isPractice = true;
                }
            });

        this.inputFiles = this.questionDetails?.input_files;
        this.variables = this.questionDetails?.variables;
        this.questionText = this.questionDetails?.text;

        this.formGroup = JavaForm.createFormWithData(this.questionDetails, this.selectedEvent, this.selectedCourse);
    }

    /**
     * Form submission.
     */
    onSubmit(): void {
        const submissionRequest = JavaForm.extractData(this.formGroup, this.variables, this.inputFiles, this.questionText);
        this.questionService.putJavaQuestion(submissionRequest, this.questionDetails.id)
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
        this.notificationsService
            .show('The Question has been Updated Successfully.', {
                status: TuiNotification.Success
            }).subscribe();
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['problems', this.questionDetails.id.toString(), 'edit']).then(() => {
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
     * Check to see if questionText is valid.
     */
    isQuestionValid(): boolean {
        return this.questionText !== '';
    }

    /**
     * Check if submissions files is valid.
     */
    isSubmissionFilesValid(): boolean {
        return !_.isEmpty(this.inputFiles);
    }

    /**
     * Check if submission is ready.
     */
    isSubmissionValid(): boolean {
        return this.isQuestionValid() && this.isSubmissionFilesValid() && this.isFormGroupValid();
    }
}
