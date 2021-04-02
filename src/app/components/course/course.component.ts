import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseService} from '@app/_services/api/course/course.service';
import {Course, CourseRegistration, User} from '@app/_models';
import {ActivatedRoute} from '@angular/router';
import {CourseRegistrationService} from '@app/_services/api/course/course-registration.service';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    course: Course;
    courseReg: CourseRegistration;
    courseId: number;
    user: User;
    teacherForClass: boolean;

    constructor(private authenticationService: AuthenticationService,
                private courseService: CourseService,
                private courseRegistrationService: CourseRegistrationService,
                private route: ActivatedRoute) {
        this.courseId = this.route.snapshot.params.courseId;
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        this.teacherForClass = this.isTeacher();
        // const needsToBeRegistered = !this.user.is_teacher; TODO: should equal this
        const needsToBeRegistered = false;
        this.courseService
            .getCourse(this.courseId, needsToBeRegistered, {ordering: {name: true}})
            .subscribe(course => {
                this.course = course;
                this.courseReg = course.course_reg;
            });
    }

    isTeacher(): boolean {
        // TODO: This depends on the course right? Need to check if teacher is teacher for this course
        // return this.user.is_teacher;
        return true;
    }
}
