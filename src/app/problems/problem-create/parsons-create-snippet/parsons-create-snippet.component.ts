import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {QuestionService} from '@app/_services/api/question.service';
import {ToastrService} from "ngx-toastr";
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {forkJoin} from 'rxjs';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';
import {ParsonsForm} from "@app/problems/_forms/parsons-form";

@Component({
    selector: 'app-parsons-create-snippet',
    templateUrl: './parsons-create-snippet.component.html',
    styleUrls: ['./parsons-create-snippet.component.scss']
})
export class ParsonsCreateSnippetComponent implements OnInit {
    formGroup: FormGroup;
    courses: Course[];
    events: CourseEvent[];
    selectedCourse: number;
    categories: Category[];
    variables: JSON[];
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
        this.formGroup = ParsonsForm.createForm();

        const categoriesObservable = this.categoryService.getCategories();
        const coursesObservable = this.courseService.getCourses();

        forkJoin([coursesObservable, categoriesObservable]).subscribe(result => {
            this.courses = result[0];
            this.categories = result[1];
        });
    }

    onSubmit(): void {
        const data = ParsonsForm.extractData(this.formGroup);
        const submissionRequest = this.problemHelpersService.createParsonsSubmissionRequest(data, this.variables, this.questionText);
        this.questionService.postParsonsQuestion(submissionRequest)
            .subscribe((result) => {
                window.scroll(0, 0);
                this.formGroup.reset();
                if (result.success != false)
                    this.toastr.success('The Question has been Created Successfully.');
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
}
