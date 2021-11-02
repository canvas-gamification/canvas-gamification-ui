import {AfterContentInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CoursesService} from "@app/admin/_services/courses.service";
import {Course} from "@app/_models";

@Component({
    selector: 'app-view-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterContentInit {
    courseData!: Course[];

    constructor(private viewCoursesService: CoursesService, private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.viewCoursesService.viewCourses().subscribe(courses => {
            this.courseData = courses;
        });
    }

    ngAfterContentInit(): void {
        this.changeDetector.detectChanges();
    }
}
