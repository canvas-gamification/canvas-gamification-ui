import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/_services/api/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {forkJoin} from 'rxjs';
import {Category, Course, Question} from '@app/_models';
import {CourseEvent} from '@app/_models/courseEvent';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';

@Component({
    selector: 'app-mcq-edit-snippet',
    templateUrl: './mcq-edit-snippet.component.html',
    styleUrls: ['./mcq-edit-snippet.component.scss']
})
export class McqEditSnippetComponent implements OnInit {
    @Input() QuestionDetails;
    MCQFormData: FormGroup;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    variables: any[];
    choiceArray: any[];
    distractArray: any[];
    newArray = Array();
    correctAnswer: any;
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

        this.MCQFormData = this.formBuilder.group({
            title: new FormControl(''),
            difficulty: new FormControl(''),
            course: new FormControl(''),
            event: new FormControl(''),
            text: new FormControl(''),
            answer: new FormControl(''),
            category: new FormControl(''),
            variables: new FormControl(''),
            visible_distractor_count: new FormControl(''),
            // Hard coded for now...
            author: new FormControl(1),
            max_submission_allowed: new FormControl(3),
            is_verified: new FormControl(true),
            // choices: new FormControl(''),
        });
        this.courseSelectedById(this.QuestionDetails.event.course);

        this.MCQFormData.controls.title.setValue(this.QuestionDetails.title);
        this.MCQFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
        this.MCQFormData.controls.category.setValue(this.QuestionDetails.category);
        this.MCQFormData.controls.course.setValue(this.QuestionDetails.event.course);
        this.MCQFormData.controls.event.setValue(this.selectedEvent);
        this.variables = this.QuestionDetails.variables;
        const outputArray = [];
        // tslint:disable-next-line:forin
        for (const choice in this.QuestionDetails.choices) {
            outputArray.push({
                id: choice,
                value: this.QuestionDetails.choices[choice]
            });
            this.choiceArray = outputArray;
        }
        this.correctAnswer = this.choiceArray[this.choiceArray
            .findIndex(x => x.id === this.QuestionDetails.answer)];
        this.MCQFormData.controls.text.setValue(this.QuestionDetails.text);
        this.MCQFormData.controls.answer.setValue(this.correctAnswer.value);
        this.MCQFormData.controls.visible_distractor_count.setValue(this.QuestionDetails.visible_distractor_count);

        // this.distractArray = this.choiceArray.splice(this.choiceArray.findIndex(x => x.id === this.QuestionDetails.answer), 1);
        this.distractArray = this.choiceArray.filter(x => x.id !== this.correctAnswer.id);
    }

    onSubmit(FormData) {
        FormData.answer = this.choiceArray[this.choiceArray.findIndex(x => x.value === FormData.answer)];
        this.newArray.push(this.correctAnswer);
        this.distractArray.forEach(answer => {
            this.newArray.push(answer);
        });
        const result = {};
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.newArray.length; i++) {
            result[this.newArray[i].id] = this.newArray[i].value;
        }
        console.log(result);
        FormData.choices = result;
        this.questionService.putMultipleChoiceQuestion(FormData, this.QuestionDetails.id)
            .subscribe(response => {
                this.messageService.addSuccess('The Question has been Updated Successfully.');
                console.log(response);
            }, error => {
                console.warn(error.responseText);
                console.log({error});
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
