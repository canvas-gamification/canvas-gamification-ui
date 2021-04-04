import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/_services/api/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/courseEvent';
import {forkJoin} from 'rxjs';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';

@Component({
    selector: 'app-java-edit-snippet',
    templateUrl: './java-edit-snippet.component.html',
    styleUrls: ['./java-edit-snippet.component.scss']
})
export class JavaEditSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    JavaFormData: FormGroup;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    variables: any[];
    selectedCourse: number;
    selectedEvent: number;
    inputFileNames: any;

    constructor(private courseService: CourseService,
                private categoryService: CategoryService,
                private formBuilder: FormBuilder,
                private questionService: QuestionService,
                private messageService: MessageService,
                private problemHelpersService: ProblemHelpersService) {
    }

    ngOnInit(): void {

        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();

        forkJoin([coursesObservable, categoriesObservable])
            .subscribe(result => {
                this.courses = result[0];
                this.categories = result[1];
            });

        this.courseSelectedById(this.QuestionDetails.event.course);
        this.inputFileNames = this.QuestionDetails?.input_file_names;

        this.JavaFormData = this.formBuilder.group({
            title: new FormControl(this.QuestionDetails?.title),
            difficulty: new FormControl(this.QuestionDetails?.difficulty),
            category: new FormControl(this.QuestionDetails?.category),
            course: new FormControl(this.QuestionDetails?.event.course),
            event: new FormControl(this.selectedEvent),
            text: new FormControl(this.QuestionDetails?.text),
            junit_template: new FormControl(this.QuestionDetails?.junit_template),
        });
    }

    onSubmit(FormData) {
        const submissionRequest = this.problemHelpersService.createJavaSubmissionRequest(FormData, this.variables, this.inputFileNames);
        this.questionService.putJavaQuestion(submissionRequest, this.QuestionDetails.id)
            .subscribe(response => {
                this.messageService.addSuccess('The Question has been Updated Successfully.');
                console.log(response);
                window.scroll(0, 0);
            }, error => {
                this.messageService.add(error.responseText);
                console.warn(error.responseText);
                console.log({error});
                window.scroll(0, 0);
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
                    this.selectedEvent = this.QuestionDetails.event.id;
                }
            });
        }
    }
}
