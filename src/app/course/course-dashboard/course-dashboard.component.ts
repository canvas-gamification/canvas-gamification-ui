import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute} from '@angular/router';
import {Course, CourseRegistration, CourseRegistrationStatus, User} from '@app/_models';
import {CourseDashboardService} from "@app/course/_services/course-dashboard.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
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
                private toastr: ToastrService,
                private route: ActivatedRoute,
                private modalService: NgbModal) {
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

    changeStatus(registrationId: number, blockStatus: boolean, verifyStatus: boolean): void {
        const data : CourseRegistrationStatus = {id: registrationId, blockStatus: blockStatus, verifyStatus: verifyStatus};
        this.courseDashboardService.updateStatus(data, this.courseId)
            .subscribe(() => {
                this.toastr.success('The block status has been changed successfully.');
                this.update();
            }, error => {
                this.toastr.error(error);
                console.warn(error);
            });
    }

    unregisterOpen(content: unknown): void {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
    }

    // To do: wait for backend to implement unregister action. Need to talk with Keyvan more about the idea
    unregisterUser(): void {
        this.courseDashboardService.unregisterUser(this.courseId)
            .subscribe(() => {
                this.toastr.success('The student has been unregistered.');
                this.update();
            }, error => {
                this.toastr.error(error);
                console.warn(error);
            });
    }

    registerUser(formData: FormGroup): void {
        const data : { username: string } = {username: formData.value.username};
        this.courseDashboardService.registerUser(data, this.courseId)
            .subscribe( () => {
                this.toastr.success('The student has been registered.');
                this.update();
            }, error => {
                console.warn(error);
            });
    }
}
