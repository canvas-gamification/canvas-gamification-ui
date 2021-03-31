import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/courseEvent';
import {forkJoin} from 'rxjs';
import {CourseService} from '@app/_services/api/course/course.service';
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
        });

        this.courseSelectedById(this.QuestionDetails.event.course);
        this.ParsonsFormData.controls.title.setValue(this.QuestionDetails.title);
        this.ParsonsFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
        this.ParsonsFormData.controls.category.setValue(this.QuestionDetails.category);
        this.ParsonsFormData.controls.course.setValue(this.QuestionDetails.event.course);
        this.ParsonsFormData.controls.event.setValue(this.selectedEvent);
        this.ParsonsFormData.controls.text.setValue(this.QuestionDetails.text);
        this.ParsonsFormData.controls.junit_template.setValue(this.QuestionDetails.junit_template);
        this.ParsonsFormData.controls.lines.setValue(this.QuestionDetails.lines.join('\n'));
        this.ParsonsFormData.controls.additional_file_name.setValue(this.QuestionDetails.additional_file_name);
    }

    courseSelectedEvent(value) {
        this.courseSelectedById(+value.target.value);
    }

    onSubmit(FormData) {
        const submissionRequest = {
            title: FormData.title,
            difficulty: FormData.difficulty,
            course: FormData.course,
            event: FormData.event,
            text: FormData.text,
            category: FormData.category,
            variables: this.QuestionDetails.variables,
            lines: FormData.lines.split('\n'),
            additional_file_name: FormData.additional_file_name,
            junit_template: FormData.junit_template,
        };
        this.questionService.putParsonsQuestion(submissionRequest, this.QuestionDetails.id)
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
