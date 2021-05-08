import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseService} from '@app/_services/api/course/course.service';
import {Course, User} from '@app/_models';
import {ActivatedRoute} from '@angular/router';
import {CourseRegistrationService} from '@app/_services/api/course/course-registration.service';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    course: Course;
    courseId: number;
    user: User;

    constructor(private authenticationService: AuthenticationService,
                private courseService: CourseService,
                private courseRegistrationService: CourseRegistrationService,
                private route: ActivatedRoute) {
        this.courseId = this.route.snapshot.params.courseId;
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        const needsToBeRegistered = this.user.is_student; // only impose that the user needs to be registered if they are a student
        this.courseService
            .getCourse(this.courseId, needsToBeRegistered, {ordering: {name: true}})
            .subscribe(course => {
                this.course = course;
            });
    }
}
