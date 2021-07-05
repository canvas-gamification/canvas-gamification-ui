import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {forkJoin} from 'rxjs';
import {QuestionService} from '@app/problems/_services/question.service';
import {ToastrService} from "ngx-toastr";
import {CourseService} from '@app/course/_services/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {JavaForm} from "@app/problems/_forms/java.form";
import {Router} from "@angular/router";

@Component({
    selector: 'app-java-create-snippet',
    templateUrl: './java-create-snippet.component.html',
    styleUrls: ['./java-create-snippet.component.scss'],
})
export class JavaCreateSnippetComponent implements OnInit {
    formGroup: FormGroup;
    courses: Course[];
    events: CourseEvent[];
    selectedCourse: number;
    categories: Category[];
    variables: JSON[];
    inputFileNames: JSON;
    questionText: string;


    constructor(private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService,
                private courseService: CourseService,
                private categoryService: CategoryService,
                private router: Router) {
    }

    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    ngOnInit(): void {
        this.formGroup = JavaForm.createForm();

        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();

        forkJoin([coursesObservable, categoriesObservable]).subscribe(result => {
            this.courses = result[0];
            this.categories = result[1];
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
        }
    }

    /**
     * Form submission.
     */
    onSubmit(): void {
        const submissionRequest = JavaForm.extractData(this.formGroup, this.variables, this.inputFileNames, this.questionText);
        this.questionService.postJavaQuestion(submissionRequest)
            .subscribe(() => {
                this.refresh();
            });
    }


    /**
     * Refresh the page upon successful submission.
     */
    refresh(): void {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['problems', 'create', 'java']).then(() => {
            window.scroll(0, 0);
            this.toastr.success('The Question has been Created Successfully.');
        });
    }
}
