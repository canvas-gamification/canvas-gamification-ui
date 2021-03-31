import {Component, OnInit} from '@angular/core';
import {QuestionService} from '@app/_services/api/question.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MessageService} from '@app/_services/message.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseService} from '@app/_services/api/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {Category, Course, User} from '@app/_models';
import {forkJoin} from 'rxjs';
import {CourseEvent} from '@app/_models/courseEvent';

@Component({
    selector: 'app-mcq-create-snippet',
    templateUrl: './mcq-create-snippet.component.html',
    styleUrls: ['./mcq-create-snippet.component.scss']
})
export class McqCreateSnippetComponent implements OnInit {
    MCQFormData: FormGroup;
    distract: FormArray;
    user: User;
    courses: Course[];
    events: CourseEvent[];
    categories: Category[];
    selectedCourse: number;
    variables: any[];

    constructor(private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private messageService: MessageService,
                private authenticationService: AuthenticationService,
                private courseService: CourseService,
                private categoryService: CategoryService) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();

        forkJoin([coursesObservable, categoriesObservable]).subscribe(result => {
            this.courses = result[0];
            this.categories = result[1];
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
            choices: new FormControl(''),
            visible_distractor_count: new FormControl(''),
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
                }
            });
        }
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
        this.questionService.postMultipleChoiceQuestion(submissionRequest)
            .subscribe(response => {
                this.messageService.addSuccess('The Question has been Created Successfully.');
                console.log(response);
            }, error => {
                console.warn(error.responseText);
                console.log({error});
            });
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
