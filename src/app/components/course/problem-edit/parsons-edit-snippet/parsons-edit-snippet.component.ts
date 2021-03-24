import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/courseEvent';
import {forkJoin} from 'rxjs';
import {CourseService} from '@app/_services/api/course.service';
import {CategoryService} from '@app/_services/api/category.service';

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
                private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();

        forkJoin([coursesObservable, categoriesObservable])
            .subscribe(result => {
                this.courses = result[0];
                this.categories = result[1];
            });
        this.variables = this.QuestionDetails.variables;

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

        this.courseSelectedById(this.QuestionDetails.event.course);
        this.ParsonsFormData.controls.title.setValue(this.QuestionDetails.title);
        this.ParsonsFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
        this.ParsonsFormData.controls.category.setValue(this.QuestionDetails.category);
        // Hard coded till event api is implemented.
        this.ParsonsFormData.controls.course.setValue(this.QuestionDetails.event.course);
        this.ParsonsFormData.controls.event.setValue(this.selectedEvent);
        this.ParsonsFormData.controls.text.setValue(this.QuestionDetails.text);
        this.ParsonsFormData.controls.junit_template.setValue(this.QuestionDetails.junit_template);
        this.ParsonsFormData.controls.lines.setValue(this.QuestionDetails.lines);
        this.ParsonsFormData.controls.additional_file_name.setValue(this.QuestionDetails.additional_file_name);
    }

    courseSelectedEvent(value) {
        this.courseSelectedById(+value.target.value);
    }

    onSubmit(FormData) {
        FormData.lines = FormData.lines.split(',');
        this.questionService.putParsonsQuestion(FormData, this.QuestionDetails.id)
            .subscribe(response => {
                this.messageService.addSuccess('The Question has been Updated Successfully.');
                console.log(response);
            }, error => {
                console.warn(error.responseText);
                console.log({error});
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
