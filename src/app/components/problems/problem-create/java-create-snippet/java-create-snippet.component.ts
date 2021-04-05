import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Category, Course, User} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {forkJoin} from 'rxjs';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';

@Component({
    selector: 'app-java-create-snippet',
    templateUrl: './java-create-snippet.component.html',
    styleUrls: ['./java-create-snippet.component.scss']
})
export class JavaCreateSnippetComponent implements OnInit {
    JavaFormData: FormGroup;
    courses: Course[];
    events: CourseEvent[];
    selectedCourse: number;
    categories: Category[];
    variables: any[];
    inputFileNames: any;


    constructor(private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private messageService: MessageService,
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

        this.JavaFormData = this.formBuilder.group({
            title: new FormControl(''),
            difficulty: new FormControl(''),
            category: new FormControl(''),
            course: new FormControl(''),
            event: new FormControl(''),
            text: new FormControl(''),
            junit_template: new FormControl(''),
            input_file_names: new FormControl(''),
        });
    }

    courseSelectedEvent(value) {
        this.courseSelectedById(+value.target.value);
    }

    courseSelectedById(courseId: number) {
        this.selectedCourse = courseId;
        if (this.courses) {
            this.courses.forEach(course => {
                if (course.course_id === this.selectedCourse) {
                    this.events = course.events;
                }
            });
        }
    }

    onSubmit(FormData) {
        const submissionRequest = this.problemHelpersService.createJavaSubmissionRequest(FormData, this.variables, this.inputFileNames);
        this.questionService.postJavaQuestion(submissionRequest)
            .subscribe(response => {
                this.messageService.addSuccess('The Question has been Created Successfully.');
                console.log(response);
                window.scroll(0, 0);
            }, error => {
                console.warn(error.responseText);
                console.log({error});
                window.scroll(0, 0);
            });
    }
}
