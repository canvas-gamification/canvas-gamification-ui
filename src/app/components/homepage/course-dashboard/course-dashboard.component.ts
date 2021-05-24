import {Component, OnInit} from '@angular/core';
import {CourseService} from '@app/_services/api/course/course.service';
import {Course, STATUS} from '@app/_models';

@Component({
    selector: 'app-course-dashboard',
    templateUrl: './course-dashboard.component.html',
    styleUrls: ['./course-dashboard.component.scss']
})
export class CourseDashboardComponent implements OnInit {
    activeCourses: Course[];

    constructor(private courseService: CourseService) {
    }

    ngOnInit(): void {
        this.courseService
            .getCourses(true, {ordering: {name: true}})
            ?.subscribe((courses) => {
                this.activeCourses = courses.filter(course => {
                    return course.status === STATUS.active;
                });
            });
    }
}
