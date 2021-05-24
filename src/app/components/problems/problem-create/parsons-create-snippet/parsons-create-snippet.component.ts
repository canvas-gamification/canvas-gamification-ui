import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {QuestionService} from '@app/_services/api/question.service';
import {ToastrService} from "ngx-toastr";
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {forkJoin} from 'rxjs';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';

@Component({
    selector: 'app-parsons-create-snippet',
    templateUrl: './parsons-create-snippet.component.html',
    styleUrls: ['./parsons-create-snippet.component.scss']
})
export class ParsonsCreateSnippetComponent implements OnInit {
    parsonsFormData: FormGroup;
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

    ngOnInit(): void {
        const categoriesObservable = this.categoryService.getCategories();
        const coursesObservable = this.courseService.getCourses();

        forkJoin([coursesObservable, categoriesObservable]).subscribe(result => {
            this.courses = result[0];
            this.categories = result[1];
        });

        this.parsonsFormData = this.formBuilder.group({
            title: new FormControl(''),
            difficulty: new FormControl(''),
            category: new FormControl(''),
            course: new FormControl(''),
            event: new FormControl(''),
            junit_template: new FormControl(''),
            lines: new FormControl(''),
            additional_file_name: new FormControl(''),
        });
    }

    onSubmit(formData: FormGroup): void {
        const submissionRequest = this.problemHelpersService.createParsonsSubmissionRequest(formData.value, this.variables, this.questionText);
        this.questionService.postParsonsQuestion(submissionRequest)
            .subscribe(() => {
                this.toastr.success('The Question has been Created Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.toastr.error(error.responseText);
                console.warn(error.responseText);
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
        }
    }
}
