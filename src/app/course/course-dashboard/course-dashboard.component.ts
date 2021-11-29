import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute} from '@angular/router';
import {Course, CourseRegistration, User, CourseRegistrationData, UQJ, CourseEvent} from '@app/_models';
import {CourseDashboardService} from "@app/course/_services/course-dashboard.service";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";
import {AbstractControl, FormGroup} from "@angular/forms";
import {CourseDashboardForm} from "@app/course/_forms/course-dashboard.form";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {CourseService} from "@app/course/_services/course.service";
import {Subject} from "rxjs";
import {Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UqjService} from "@app/problems/_services/uqj.service";
import {QuestionReportService} from "@app/course/_services/question-report.service";

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
    event: CourseEvent;
    eventId: number;
    registrationList: CourseRegistration[];
    uqjsSource: MatTableDataSource<UQJ>;
    registrationsSource: MatTableDataSource<CourseRegistration>;
    displayedColumns: string[] = ['username', 'name', 'status', 'action'];
    displayedColumnsReport: string[] = ['reportId', 'reportOption', 'reportDetails','question'];
    // Sorting
    ordering: string;

    //Filtering
    filterQueryString;

    paramChanged: Subject<{
        name: string;
        username: string;
        ordering: string
    }> = new Subject<{
        name: string;
        username: string;
        ordering: string
    }>();

    constructor(private authenticationService: AuthenticationService,
                private courseDashboardService: CourseDashboardService,
                private courseService: CourseService,
                private uqjService: UqjService,
                private questionReportService: QuestionReportService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
                private route: ActivatedRoute) {
        this.formGroup = CourseDashboardForm.createForm();
        this.authenticationService.currentUser.subscribe(user => this.user = user);
        this.courseId = this.route.snapshot.params.courseId;
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.courseDashboardService.getCourseUsersFilter(this.courseId, options).subscribe(registrations => {
                this.registrationList = registrations;
                this.registrationsSource = new MatTableDataSource(this.registrationList);

            });
        });
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
                this.registrationsSource = new MatTableDataSource(this.registrationList);
            });
        this.courseId = +this.route.snapshot.paramMap.get('courseId') || null;
        this.eventId = +this.route.snapshot.paramMap.get('eventId') || null;

        this.uqjService.getUQJs({filters:{}}).subscribe(response => {
            console.log(response);
            this.uqjsSource = new MatTableDataSource(response.results);
        });

    }


    /**
     * Update the current view of the course-dashboard.
     */
    update(): void {
        const options = {
            ...this.filterQueryString,
            ordering: this.ordering,
        };
        this.paramChanged.next(options);
    }



    /**
     * Helper method for sorting the canvascourseregistration objects.
     * @param sort - The current sort state.
     */
    sortData(sort: Sort): void {
        if (sort.direction === 'asc') {
            this.ordering = sort.active;
        } else if (sort.direction === 'desc') {
            this.ordering = '-' + sort.active;
        } else {
            this.ordering = '';
        }
        this.update();
    }

    /**
     * Apply the filters to the canvascourseregistration objects.
     */
    applyFilter(): void {
        this.filterQueryString = this.formGroup.value;
        this.update();
    }


    /**
     * Method to get the form controls.
     */
    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    /**
     * Update status of one user.
     * @param registrationId - The canvascourseregistration object's id.
     * @param status - Status to change to.
     */
    changeStatus(registrationId: number, status: string): void {
        const data: CourseRegistrationData = {id: registrationId, status: status};
        this.courseDashboardService.updateStatus(data)
            .subscribe(() => {
                this.notificationsService
                    .show('The status has been changed successfully.', {
                        status: TuiNotification.Success
                    }).subscribe();
                this.update();
            });
    }

    /**
     * Create a user
     * @param username - username of the desired user
     */
    registerUser(username: string): void {
        const data: CourseRegistrationData = {username: username};
        this.courseDashboardService.registerUser(data, this.courseId)
            .subscribe(() => {
                this.notificationsService
                    .show('The student has been registered.', {
                        status: TuiNotification.Success
                    }).subscribe();
                this.update();
            });
    }
}
