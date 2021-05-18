import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {forkJoin} from 'rxjs';
import {Category, Course, MESSAGE_TYPES} from '@app/_models';
import {CourseEvent} from '@app/_models/course_event';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';
import {CourseEventService} from '@app/_services/api/course/course-event.service';

@Component({
    selector: 'app-mcq-edit-snippet',
    templateUrl: './mcq-edit-snippet.component.html',
    styleUrls: ['./mcq-edit-snippet.component.scss']
})
export class McqEditSnippetComponent implements OnInit {
    @Input() questionDetails;
    // public ckEditor = ClassicEditor
    mcqFormData: FormGroup;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    variables: JSON;
    choiceArray: { id: string, value: string }[];
    correctAnswer: { id: string, value: string };
    selectedCourse: number;
    selectedEvent: number;
    distract: FormArray;
    questionText: string;
    answerText: string;

    constructor(private courseService: CourseService,
                private categoryService: CategoryService,
                private formBuilder: FormBuilder,
                private questionService: QuestionService,
                private messageService: MessageService,
                private problemHelpersService: ProblemHelpersService,
                private courseEventService: CourseEventService) {
    }

    ngOnInit(): void {
        if (this.questionDetails.event) {
            const coursesObservable = this.courseService.getCourses();
            const categoriesObservable = this.categoryService.getCategories();
            const eventObservable = this.courseEventService.getCourseEvent(this.questionDetails?.event);

            forkJoin([coursesObservable, categoriesObservable, eventObservable])
                .subscribe(result => {
                    this.courses = result[0];
                    this.categories = result[1];
                    this.courseSelectedById(result[2].course);
                });
        } else {
            const coursesObservable = this.courseService.getCourses();
            const categoriesObservable = this.categoryService.getCategories();

            forkJoin([coursesObservable, categoriesObservable])
                .subscribe(result => {
                    this.courses = result[0];
                    this.categories = result[1];
                });
        }

        this.distract = new FormArray([]);
        this.convertChoicesToArray(this.questionDetails?.choices);
        this.correctAnswer = this.choiceArray[this.choiceArray
            .findIndex(x => x.id === this.questionDetails.answer)];
        this.distract.removeAt(this.distract.value.findIndex(item => item === this.correctAnswer.value));
        this.variables = this.questionDetails?.variables;
        this.questionText = this.questionDetails?.text;
        this.answerText = this.correctAnswer.value;
        this.mcqFormData = this.formBuilder.group({
            title: new FormControl(this.questionDetails?.title),
            difficulty: new FormControl(this.questionDetails?.difficulty),
            course: new FormControl(this.selectedCourse),
            event: new FormControl(this.selectedEvent),
            category: new FormControl(this.questionDetails?.category),
            variables: new FormControl(''),
            visible_distractor_count: new FormControl(this.questionDetails?.visible_distractor_count.toString()),
            is_verified: new FormControl(true),
            choices: new FormControl(''),
        });
    }

    onSubmit(formData: FormGroup): void {
        const submissionRequest = this.problemHelpersService.createMCQSubmissionRequest(formData.value, this.distract, this.variables, this.questionText, this.answerText);
        this.questionService.putMultipleChoiceQuestion(submissionRequest, this.questionDetails.id)
            .subscribe(() => {
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'The Question has been Updated Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                console.warn(error.responseText);
                window.scroll(0, 0);
            });
    }

    courseSelectedEvent(value: Event) : void {
        this.courseSelectedById(+(value.target as HTMLInputElement).value);
    }

    courseSelectedById(courseId: number) : void{
        this.selectedCourse = courseId;
        if (this.courses) {
            this.courses.forEach(course => {
                if (course.id === this.selectedCourse) {
                    this.events = course.events;
                }
            });
            this.selectedEvent = this.questionDetails.event;
            this.mcqFormData.controls.course.setValue(this.selectedCourse);
            this.mcqFormData.controls.event.setValue(this.selectedEvent);
        }
    }

    addChoice() : void {
        this.distract.push(new FormControl(''));
    }

    removeChoice(index : number) : void {
        this.distract.removeAt(index);
    }

    convertChoicesToArray(choices: { [id: string]: string}) : void {
        const outputArray = [];
        for (const choice in choices) {
            outputArray.push({
                id: choice,
                value: choices[choice]
            });
            this.distract.push(new FormControl(choices[choice]));
        }
        this.choiceArray = outputArray;
    }
}
