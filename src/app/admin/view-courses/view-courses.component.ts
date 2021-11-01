import {AfterContentInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ViewCoursesService} from "@app/admin/_services/view-courses.service";
import {AdminCourse} from "@app/_models";

@Component({
    selector: 'app-view-courses',
    templateUrl: './view-courses.component.html',
    styleUrls: ['./view-courses.component.scss']
})
export class ViewCoursesComponent implements OnInit, AfterContentInit {
    courseData!: AdminCourse[];

    constructor(private viewCoursesService: ViewCoursesService, private changeDetector: ChangeDetectorRef) {
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
