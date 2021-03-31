import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/courseEvent';
import {forkJoin} from 'rxjs';
import {CourseService} from '@app/_services/api/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';

@Component({
    selector: 'app-parsons-edit-snippet',
    templateUrl: './parsons-edit-snippet.component.html',
    styleUrls: ['./parsons-edit-snippet.component.scss']
})
export class ParsonsEditSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    ParsonsFormData: FormGroup;
    selectedCourse: number;
    selectedEvent: number;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    variables: any[];

    constructor(private formBuilder: FormBuilder,
                private questionService: QuestionService,
                private messageService: MessageService,
                private courseService: CourseService,
                private categoryService: CategoryService,
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

        this.ParsonsFormData = this.formBuilder.group({
            title: new FormControl(this.QuestionDetails?.title),
            difficulty: new FormControl(this.QuestionDetails?.difficulty),
            category: new FormControl(this.QuestionDetails?.category),
            course: new FormControl(this.QuestionDetails?.event.course),
            event: new FormControl(this.selectedEvent),
            text: new FormControl(this.QuestionDetails?.text),
            junit_template: new FormControl(this.QuestionDetails?.junit_template),
            lines: new FormControl(this.QuestionDetails?.lines.join('\n')),
            additional_file_name: new FormControl(this.QuestionDetails?.additional_file_name),
        });
    }

    courseSelectedEvent(value) {
        this.courseSelectedById(+value.target.value);
    }

    onSubmit(FormData) {
        const submissionRequest = this.problemHelpersService.createParsonsSubmissionRequest(FormData, this.variables);
        this.questionService.putParsonsQuestion(submissionRequest, this.QuestionDetails.id)
            .subscribe(response => {
                this.messageService.addSuccess('The Question has been Updated Successfully.');
                console.log(response);
                window.scroll(0, 0);
            }, error => {
                console.warn(error.responseText);
                console.log({error});
                window.scroll(0, 0);
            });
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
