import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute} from '@angular/router';
import {Course, CourseRegistration, User, CourseRegistrationData} from '@app/_models';
import {CourseDashboardService} from "@app/course/_services/course-dashboard.service";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import {CourseDashboardForm} from "@app/course/_forms/course-dashboard.form";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {CourseService} from "@app/course/_services/course.service";
import {Subject} from "rxjs";

@Component({
    selector: 'app-course-dashboard',
    templateUrl: './course-dashboard.component.html',
    styleUrls: ['./course-dashboard.component.scss']
})


export class CourseDashboardComponent implements OnInit {
    formGroup: FormGroup;
    courseId: number;
    userId: number;
    user: User;
    course: Course;
    registrationList: CourseRegistration[];
    filterQueryString;

    paramChanged: Subject<{
        name: string;
        username: string;
    }> = new Subject<{
        name: string;
        username: string;
    }>();

    constructor(private authenticationService: AuthenticationService,
                private courseDashboardService: CourseDashboardService,
                private courseService: CourseService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
                private route: ActivatedRoute) {
        this.formGroup = CourseDashboardForm.createForm();
        this.authenticationService.currentUser.subscribe(user => this.user = user);
        this.courseId = this.route.snapshot.params.courseId;
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.courseDashboardService.getCourseUsersFilter(this.courseId, options).subscribe(registrations => {
                this.registrationList = registrations;
            });
        });
    }

    update(): void {
        const options = {
            ...this.filterQueryString,
        };
        this.paramChanged.next(options);
    }

    applyFilter(): void {
        this.filterQueryString = this.formGroup.value;
        this.update();
    }

    ngOnInit(): void {
        this.courseService
            .getCourse(this.courseId)
            .subscribe(course => {
                this.course = course;
            });
        this.courseDashboardService
            .getCourseUsers(this.courseId)
            .subscribe(registrations => {
                this.registrationList = registrations;
            });
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    changeStatus(registrationId: number, status: string): void {
        const data : CourseRegistrationData = {id: registrationId, status: status};
        this.courseDashboardService.updateStatus(data)
            .subscribe(() => {
                this.notificationsService
                    .show('The status has been changed successfully.', {
                        status: TuiNotification.Success
                    }).subscribe();
                this.update();
            }, error => {
                this.notificationsService
                    .show(error, {
                        status: TuiNotification.Error
                    }).subscribe();
            });
    }

    registerUser(username: string): void {
        const data : CourseRegistrationData = {username: username};
        this.courseDashboardService.registerUser(data, this.courseId)
            .subscribe( () => {
                this.notificationsService
                    .show('The student has been registered.', {
                        status: TuiNotification.Success
                    }).subscribe();
                this.update();
            }, error => {
                this.notificationsService
                    .show(error, {
                        status: TuiNotification.Error
                    }).subscribe();
            });
    }
}
