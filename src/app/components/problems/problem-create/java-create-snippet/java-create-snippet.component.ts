import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {forkJoin} from 'rxjs';
import {QuestionService} from '@app/_services/api/question.service';
import {ToastrService} from "ngx-toastr";
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';

@Component({
    selector: 'app-java-create-snippet',
    templateUrl: './java-create-snippet.component.html',
    styleUrls: ['./java-create-snippet.component.scss']
})
export class JavaCreateSnippetComponent implements OnInit {
    javaFormData: FormGroup;
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

    ngOnInit(): void {
        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();

        forkJoin([coursesObservable, categoriesObservable]).subscribe(result => {
            this.courses = result[0];
            this.categories = result[1];
        });

        this.javaFormData = this.formBuilder.group({
            title: new FormControl(''),
            difficulty: new FormControl(''),
            category: new FormControl(''),
            course: new FormControl(''),
            event: new FormControl(''),
            junit_template: new FormControl(''),
            input_file_names: new FormControl(''),
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

    onSubmit(formData: FormGroup): void {
        const submissionRequest = this.problemHelpersService.createJavaSubmissionRequest(formData.value, this.variables, this.inputFileNames, this.questionText);
        this.questionService.postJavaQuestion(submissionRequest)
            .subscribe(() => {
                this.toastr.success('The Question has been Created Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.toastr.error(error);
                console.warn(error);
                window.scroll(0, 0);
            });
    }
}
