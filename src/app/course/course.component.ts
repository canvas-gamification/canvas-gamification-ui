import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseService} from '@app/course/_services/course.service';
import {Course, User} from '@app/_models';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    course: Course;
    allCourses: Course[];
    courseId: number;
    user: User;

    constructor(private authenticationService: AuthenticationService,
                private courseService: CourseService,
                private route: ActivatedRoute) {
        this.courseId = this.route.snapshot.params.courseId;
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        this.courseService
            .getCourse(this.courseId)
            .subscribe(course => {
                this.course = course;
            });
    }
}
