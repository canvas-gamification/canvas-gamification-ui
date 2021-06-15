import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {forkJoin} from 'rxjs';
import {QuestionService} from '@app/_services/api/question.service';
import {ToastrService} from "ngx-toastr";
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';
import {JavaForm} from "@app/problems/_forms/java-form";

@Component({
    selector: 'app-java-create-snippet',
    templateUrl: './java-create-snippet.component.html',
    styleUrls: ['./java-create-snippet.component.scss']
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
                private problemHelpersService: ProblemHelpersService) {
    }

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

    onSubmit(): void {
        const data = JavaForm.extractData(this.formGroup);
        const submissionRequest = this.problemHelpersService.createJavaSubmissionRequest(data, this.variables, this.inputFileNames, this.questionText);
        this.questionService.postJavaQuestion(submissionRequest)
            .subscribe(() => {
                window.scroll(0, 0);
                this.formGroup.reset();
                this.toastr.success('The Question has been Created Successfully.');
            }, (error) => {
                this.toastr.error(error);
            });
    }
}
