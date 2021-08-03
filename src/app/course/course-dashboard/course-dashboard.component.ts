import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute} from '@angular/router';
import {CourseRegistration, User} from '@app/_models';
import {CourseDashboardServiceService} from "@app/course/_services/course-dashboard.service";
import {Subject} from "rxjs";
@Component({
    selector: 'app-course-dashboard',
    templateUrl: './course-dashboard.component.html',
    styleUrls: ['./course-dashboard.component.scss']
})

export class CourseDashboardComponent implements OnInit {
    courseId: number;
    user: User;
    userList : User[];
    registrationList : CourseRegistration[];
    filterQueryString;
    paramChanged: Subject<{
        id:number;
    }> = new Subject<{
        id:number;
    }>();
    update(): void {
        const options = {
            ...this.filterQueryString,
        };
        this.paramChanged.next(options);
    }

    constructor(private authenticationService: AuthenticationService,
                private courseService: CourseDashboardServiceService,
                private route: ActivatedRoute) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
        this.courseId = this.route.snapshot.params.courseId;
    }

    ngOnInit(): void {
        this.courseService
            .getCourseDashboard(this.courseId)
            .subscribe(users => {
                this.userList = users;
            });

        this.courseService
            .getCourseRegistration(this.courseId)
            .subscribe(registrations => {
                this.registrationList = registrations;
            });

    }

}
