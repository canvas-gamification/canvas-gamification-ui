import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '@app/_services/api/question.service';
import {forkJoin, Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MessageService} from '@app/_services/message.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {Category, Course, Question, User} from '@app/_models';
import {CourseService} from '@app/_services/api/course.service';
import {CourseEvent} from '@app/_models/courseEvent';
import {CategoryService} from '@app/_services/api/category.service';

@Component({
    selector: 'app-problem-create',
    templateUrl: './problem-create.component.html',
    styleUrls: ['./problem-create.component.scss']
})
export class ProblemCreateComponent implements OnInit {

    user: User;
    private routeSub: Subscription;
    MCQFormData: FormGroup;
    JavaFormData: FormGroup;
    ParsonsFormData: FormGroup;
    questionType: string;
    courses: Course[];
    events: CourseEvent[];
    selectedCourse: number;
    categories: Category[];

    constructor(private route: ActivatedRoute,
                private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private messageService: MessageService,
                private authenticationService: AuthenticationService,
                private courseService: CourseService,
                private categoryService: CategoryService) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.questionType = params.type;
        });
        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();

        forkJoin([coursesObservable, categoriesObservable]).subscribe(result => {
           this.courses = result[0];
           this.categories = result[1];
        });

        if (this.questionType === 'MCQ') {
            this.MCQFormData = this.formBuilder.group({
                title: new FormControl(''),
                difficulty: new FormControl(''),
                course: new FormControl(''),
                event: new FormControl(''),
                text: new FormControl(''),
                answer: new FormControl(''),
                category: new FormControl(''),
                variables: new FormControl(''),

                // Hard coded for now...
                author: new FormControl(1),
                visible_distractor_count: new FormControl('3'),
                max_submission_allowed: new FormControl(3),
                is_verified: new FormControl(true),
                choices: new FormControl({
                    a: 'test',
                    b: 'TEST',
                    c: 'teSt',
                }),
            });
        }
        if (this.questionType === 'java') {
            this.JavaFormData = this.formBuilder.group({
                title: new FormControl(''),
                difficulty: new FormControl(''),
                category: new FormControl(''),
                course: new FormControl(''),
                event: new FormControl(''),
                text: new FormControl(''),
                junit_template: new FormControl(''),
                input_file_names: new FormControl(''),
                variables: new FormControl(''),

                // Hard coded for now...
                author: new FormControl(1),
                max_submission_allowed: new FormControl(5),
                is_verified: new FormControl(true),
            });
        }
        if (this.questionType === 'parsons') {
            this.ParsonsFormData = this.formBuilder.group({
                title: new FormControl(''),
                difficulty: new FormControl(''),
                category: new FormControl(''),
                course: new FormControl(''),
                event: new FormControl(''),
                text: new FormControl(''),
                junit_template: new FormControl(''),
                lines: new FormControl(''),
                additional_file_name: new FormControl(''),

                // Hard coded for now...
                author: new FormControl(1),
                max_submission_allowed: new FormControl(100),
                is_verified: new FormControl(true),
            });
        }
    }

    onSubmit(FormData) {
        if (this.questionType === 'MCQ') {
            this.questionService.postMultipleChoiceQuestion(FormData)
                .subscribe(response => {
                    this.messageService.addSuccess('The Question has been Created Successfully.');
                    const jsonResponse: Question = JSON.parse(response);
                    // this.questionService.putQuestion({
                    //     event: this.MCQFormData.controls.event,
                    // }, jsonResponse.id).subscribe(updateResponse => {
                    // }, error => {
                    //     console.warn(error.responseText);
                    //     console.log({error});
                    //     });
                }, error => {
                    console.warn(error.responseText);
                    console.log({error});
                });
        }
        if (this.questionType === 'java') {
            this.questionService.postJavaQuestion(FormData)
                .subscribe(response => {
                    this.messageService.addSuccess('The Question has been Created Successfully.');
                    const jsonResponse: Question = JSON.parse(response);
                    // this.questionService.putQuestion({
                    //     event: this.MCQFormData.controls.event,
                    // }, jsonResponse.id).subscribe(updateResponse => {
                    // }, error => {
                    //     console.warn(error.responseText);
                    //     console.log({error});
                    //     });
                }, error => {
                    console.warn(error.responseText);
                    console.log({error});
                });
        }

        if (this.questionType === 'parsons') {
            FormData.lines = FormData.lines.split(',');
            this.questionService.postParsonsQuestion(FormData)
                .subscribe(response => {
                    this.messageService.addSuccess('The Question has been Created Successfully.');
                    const jsonResponse: Question = JSON.parse(response);
                    // this.questionService.putQuestion({
                    //     event: this.MCQFormData.controls.event,
                    // }, jsonResponse.id).subscribe(updateResponse => {
                    // }, error => {
                    //     console.warn(error.responseText);
                    //     console.log({error});
                    //     });
                }, error => {
                    console.warn(error.responseText);
                    console.log({error});
                });
        }
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
}
