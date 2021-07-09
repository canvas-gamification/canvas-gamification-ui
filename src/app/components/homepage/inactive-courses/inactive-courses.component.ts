import {Component, OnInit} from '@angular/core';
import {Course, STATUS} from '@app/_models';
import {CourseService} from '@app/course/_services/course.service';

@Component({
    selector: 'app-inactive-courses',
    templateUrl: './inactive-courses.component.html',
    styleUrls: ['./inactive-courses.component.scss']
})
export class InactiveCoursesComponent implements OnInit {
    inactiveCourses: Course[];

    constructor(private courseService: CourseService) {
    }

    ngOnInit(): void {
        this.courseService
            .getCourses(true, {ordering: {name: true}})
            ?.subscribe((courses) => {
                this.inactiveCourses = courses.filter(course => {
                    return course.status !== STATUS.active;
                });
            });
    }
}
