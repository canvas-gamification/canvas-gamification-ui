import {Component, Inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/problems/_services/question.service';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {CourseService} from '@app/course/_services/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {CourseEventService} from '@app/course/_services/course-event.service';
import {ParsonsForm} from "@app/problems/_forms/parsons.form";
import {Router} from "@angular/router";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

@Component({
    selector: 'app-parsons-edit-snippet',
    templateUrl: './parsons-edit-snippet.component.html',
    styleUrls: ['./parsons-edit-snippet.component.scss'],
})
export class ParsonsEditSnippetComponent implements OnInit {
    @Input() questionDetails;
    formGroup: FormGroup;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    variables: JSON[];
    inputFiles: { name: string, compile: boolean, lines: string }[]
    questionText: string;
    isPractice: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private questionService: QuestionService,
        private courseService: CourseService,
        private categoryService: CategoryService,
        private courseEventService: CourseEventService,
        private router: Router,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
    }

    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    ngOnInit(): void {
        this.inputFiles = this.questionDetails?.input_files?.map(inputFile => ({
            name: inputFile.name,
            compile: inputFile.compile,
            lines: inputFile.lines.join('\n')
        }));
        this.variables = this.questionDetails.variables;
        this.questionText = this.questionDetails.text;
        this.formGroup = ParsonsForm.createFormWithData(this.questionDetails);

        this.courseService.getCourses().subscribe(course => {
            this.courses = course;
            if (this.questionDetails.event) {
                this.isPractice = false;
                this.setCourse(this.questionDetails.event_obj.course);
                this.setEvent(this.questionDetails.event);
            } else {
                this.isPractice = true;
            }
        });
        this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }

    /**
     * Form submission.
     */
    onSubmit(): void {
        const submissionRequest = ParsonsForm.extractData(this.formGroup, this.variables, this.inputFiles, this.questionText);
        this.questionService.putParsonsQuestion(submissionRequest, this.questionDetails.id)
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
        if (this.courses) {
            this.courses.forEach(course => {
                if (course.id === courseId) {
                    this.events = course.events;
                }
            });
            this.setEvent(null);
            this.form.course.setValue(courseId);
        }
    }

    /**
     * Set the event.
     * @param event - The event object to set.
     */
    setEvent(event: number): void {
        this.form.event.setValue(event);
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
     * Verify if submission is ready.
     */
    isSubmissionValid(): boolean {
        return this.isFormGroupValid() && this.isQuestionValid();
    }
}
