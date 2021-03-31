import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '@app/_services/api/course/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {forkJoin} from 'rxjs';
import {Category, Course} from '@app/_models';
import {CourseEvent} from '@app/_models/courseEvent';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
    correctAnswer: any;
    selectedCourse: number;
    selectedEvent: number;
    distract: FormArray;

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
                this.courseSelectedById(this.QuestionDetails.event?.course);
            });

        this.distract = new FormArray([]);

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
            is_verified: new FormControl(true),
            choices: new FormControl(''),
        });

        this.MCQFormData.controls.title.setValue(this.QuestionDetails.title);
        this.MCQFormData.controls.difficulty.setValue(this.QuestionDetails.difficulty);
        this.MCQFormData.controls.category.setValue(this.QuestionDetails.category);
        this.MCQFormData.controls.course.setValue(this.QuestionDetails.event?.course);
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
            this.distract.push(new FormControl(this.QuestionDetails.choices[choice]));
        }
        this.correctAnswer = this.choiceArray[this.choiceArray
            .findIndex(x => x.id === this.QuestionDetails.answer)];
        this.distract.removeAt(this.distract.value.findIndex(item => item === this.correctAnswer.value));
        this.MCQFormData.controls.text.setValue(this.QuestionDetails.text);
        this.MCQFormData.controls.answer.setValue(this.correctAnswer.value);
        this.MCQFormData.controls.visible_distractor_count.setValue(this.QuestionDetails.visible_distractor_count);

    }

    onSubmit(FormData) {
        let mcqChoices = this.distract.value;
        mcqChoices.unshift(FormData.answer);
        mcqChoices = this.arrayToObject(mcqChoices);
        const correctAnswer = Object.keys(mcqChoices).find(key => mcqChoices[key] === FormData.answer);
        const submissionRequest = {
            title: FormData.title,
            difficulty: FormData.difficulty,
            course: FormData.course,
            event: FormData.event,
            text: FormData.text,
            answer: correctAnswer,
            category: FormData.category,
            variables: this.variables,
            visible_distractor_count: FormData.visible_distractor_count,
            choices: mcqChoices
        };
        this.questionService.putMultipleChoiceQuestion(submissionRequest, this.QuestionDetails.id)
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

    addChoice() {
        this.distract.push(new FormControl(''));
    }

    removeChoice(index) {
        this.distract.removeAt(index);
    }

    getNextLetter(char) {
        let code = char.charCodeAt(0);
        code++;
        return String.fromCharCode(code);
    }

    arrayToObject(choicesArray: string[]) {
        const choices = {};
        let id = 'a';
        for (const choice of choicesArray) {
            choices[id] = choice;
            id = this.getNextLetter(id);
        }
        return choices;
    }
}
