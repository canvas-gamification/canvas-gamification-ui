import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {Category, Course, CourseEvent} from "@app/_models";
import {CourseService} from "@app/course/_services/course.service";
import {CategoryService} from "@app/_services/api/category.service";
import {DifficultyService} from "@app/problems/_services/difficulty.service";
import {forkJoin} from "rxjs";
import {Difficulty} from "@app/_models/difficulty";

@Component({
    selector: 'app-default-create-edit-snippet',
    templateUrl: './default-create-edit-snippet.component.html',
    styleUrls: ['./default-create-edit-snippet.component.scss']
})
export class DefaultCreateEditSnippetComponent implements OnInit{

    @Input() formGroup: FormGroup;
    courses: Course[];
    categories: Category[];
    difficulties: Difficulty[];
    events: CourseEvent[];
    isPractice = false;

    constructor(private courseService: CourseService,
                private categoryService: CategoryService,
                private difficultyService: DifficultyService) {
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    ngOnInit(): void {
        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();
        const difficultyObservable = this.difficultyService.getDifficulties();

        forkJoin([coursesObservable, categoriesObservable, difficultyObservable]).subscribe(result => {
            this.courses = result[0];
            this.categories = result[1];
            this.difficulties = result[2];

            if (this.form.course.value) this.setCourseEvents(this.form.course.value);
        });

        this.form.event.disable();
        this.form.course.valueChanges.subscribe((courseId) => {
            if (courseId) this.setCourseEvents(courseId);
            else {
                this.form.event.reset();
                this.form.event.disable();
            }
        });

        this.isPractice = !this.form.event.value;
    }

    /**
     * If the practice checkbox is selected, reset the selected course
     * @param isPractice
     */
    resetCourseIfPractice(isPractice: boolean): void {
        this.isPractice = isPractice;
        if (isPractice) this.form.course.reset();
    }

    /**
     * Given a course id, get the events associated with that course
     * @param courseId
     */
    setCourseEvents(courseId: number): void {
        this.courses.forEach(course => {
            if (course.id === courseId) {
                this.events = course.events;
                this.form.event.enable();
                return;
            }
        });
    }
}
