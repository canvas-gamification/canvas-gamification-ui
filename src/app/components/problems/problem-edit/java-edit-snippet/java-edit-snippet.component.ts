import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/_services/api/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/courseEvent';
import {forkJoin} from 'rxjs';

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
    selectedCourse: number;
    selectedEvent: number;

    constructor(private courseService: CourseService,
                private categoryService: CategoryService,
                private formBuilder: FormBuilder,
                private questionService: QuestionService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {

        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();

        forkJoin([coursesObservable, categoriesObservable])
            .subscribe(result => {
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
        });

        this.courseSelectedById(this.QuestionDetails.event.course);
        this.JavaFormData.controls.title.setValue(this.QuestionDetails.title);
        this.JavaFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
        this.JavaFormData.controls.category.setValue(this.QuestionDetails.category);
        this.JavaFormData.controls.course.setValue(this.QuestionDetails.event.course);
        this.JavaFormData.controls.event.setValue(this.selectedEvent);
        this.JavaFormData.controls.text.setValue(this.QuestionDetails.text);
        this.JavaFormData.controls.junit_template.setValue(this.QuestionDetails.junit_template);
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
            junit_template: FormData.junit_template,
            input_file_names: this.QuestionDetails.input_file_names,
        };
        this.questionService.putJavaQuestion(submissionRequest, this.QuestionDetails.id)
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
