import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/_services/api/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {forkJoin} from 'rxjs';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/courseEvent';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {ProblemHelpersService} from '@app/_services/problem-helpers.service';

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
    correctAnswer: { id: string, value: string };
    selectedCourse: number;
    selectedEvent: number;
    distract: FormArray;

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
                this.courseSelectedById(this.QuestionDetails.event?.course);
            });

        this.distract = new FormArray([]);
        this.convertChoicesToArray(this.QuestionDetails?.choices);
        this.correctAnswer = this.choiceArray[this.choiceArray
            .findIndex(x => x.id === this.QuestionDetails.answer)];
        this.distract.removeAt(this.distract.value.findIndex(item => item === this.correctAnswer.value));
        this.variables = this.QuestionDetails.variables;

        this.MCQFormData = this.formBuilder.group({
            title: new FormControl(this.QuestionDetails?.title),
            difficulty: new FormControl(this.QuestionDetails?.difficulty),
            course: new FormControl(this.QuestionDetails.event?.course),
            event: new FormControl(this.selectedEvent),
            text: new FormControl(this.QuestionDetails?.text),
            answer: new FormControl(this.correctAnswer.value),
            category: new FormControl(this.QuestionDetails?.category),
            variables: new FormControl(''),
            visible_distractor_count: new FormControl(this.QuestionDetails?.visible_distractor_count.toString()),
            is_verified: new FormControl(true),
            choices: new FormControl(''),
        });
    }

    onSubmit(FormData) {
        const submissionRequest = this.problemHelpersService.createMCQSubmissionRequest(FormData, this.distract, this.variables);
        this.questionService.putMultipleChoiceQuestion(submissionRequest, this.QuestionDetails.id)
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

    addChoice() {
        this.distract.push(new FormControl(''));
    }

    removeChoice(index) {
        this.distract.removeAt(index);
    }

    convertChoicesToArray(choices: {}) {
        const outputArray = [];
        // tslint:disable-next-line:forin
        for (const choice in choices) {
            outputArray.push({
                id: choice,
                value: choices[choice]
            });
            this.choiceArray = outputArray;
            this.distract.push(new FormControl(choices[choice]));
        }
    }
}
