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
        const needsToBeRegistered = this.user.is_student; // only impose that the user needs to be registered if they are a student
        this.courseService
            .getCourse(this.courseId, needsToBeRegistered, {ordering: {name: true}})
            .subscribe(course => {
                this.course = course;
                this.courseReg = course.course_reg;
            });
    }

    isTeacher(): boolean {
        /*
           TODO: this is supposed to return if the user is a teacher for this specific course, then it should be named as such,
           and if we decided this feature was out of scope for now then there's no point leaving it in here if we don't know
           how it'll be implemented in the end
        */
        return this.user.is_teacher;
    }
}
