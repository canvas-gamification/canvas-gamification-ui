import {AfterContentInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ViewCoursesService} from "@app/admin/_services/view-courses.service";
import {ViewCourse} from "@app/_models";

@Component({
    selector: 'app-view-courses',
    templateUrl: './view-courses.component.html',
    styleUrls: ['./view-courses.component.scss']
})
export class ViewCoursesComponent implements OnInit, AfterContentInit {
    viewCoursesData!: ViewCourse[];

    constructor(private viewCoursesService: ViewCoursesService, private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.viewCoursesService.viewCourses().subscribe(viewCoursesData => {
            this.viewCoursesData = viewCoursesData;
        });
    }

    ngAfterContentInit(): void {
        this.changeDetector.detectChanges();
    }
}
