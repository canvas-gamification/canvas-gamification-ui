import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute} from '@angular/router';
import {Course, CourseRegistration, User} from '@app/_models';
import {CourseDashboardService} from "@app/course/_services/course-dashboard.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {CourseDashboardForm} from "@app/course/_forms/course-dashboard.form";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {AdminService} from "@app/_services/api/admin.service";
import {CourseService} from "@app/course/_services/course.service";
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "rxjs";

@Component({
    selector: 'app-course-dashboard',
    templateUrl: './course-dashboard.component.html',
    styleUrls: ['./course-dashboard.component.scss']
})

export class CourseDashboardComponent implements OnInit {
    courseList: MatTableDataSource<Course>;
    formGroup: FormGroup;
    courseId: number;
    userId: number;
    user: User;
    unregisteredUsers: User[];
    userList: User[];
    allUserList: User[];
    registrationList: CourseRegistration[];
    variable: boolean;
    filterQueryString;
    userCourseList: User[];
    courseRegId: number;
    courseNamesList: Course[];

    paramChanged: Subject<{
        name: string;
        modalName: string;
    }> = new Subject<{
        name: string;
        modalName: string;
    }>();

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

    constructor(private builder: FormBuilder,
                private adminService: AdminService,
                private authenticationService: AuthenticationService,
                private courseDashboardService: CourseDashboardService,
                private courseService: CourseService,
                private toastr: ToastrService,
                private route: ActivatedRoute,
                private modalService: NgbModal) {
        this.formGroup = CourseDashboardForm.createForm();
        this.authenticationService.currentUser.subscribe(user => this.user = user);
        this.courseId = this.route.snapshot.params.courseId;
        this.paramChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe(options => {
            this.courseDashboardService.getCourseDashboardFilter(this.courseId, options).subscribe(users => {
                this.userList = users;
            });
            this.courseDashboardService.getUnregisteredStudents(this.courseId, options).subscribe(unregisteredUsers => {
                this.unregisteredUsers = unregisteredUsers;
            });
        });
    }

    ngOnInit(): void {
        this.courseDashboardService
            .getCourseDashboard(this.courseId)
            .subscribe(users => {
                this.userList = users;
            });
        this.courseDashboardService
            .getCourseRegistration(this.courseId)
            .subscribe(registrations => {
                this.registrationList = registrations;
            });
        this.courseDashboardService
            .getAllUser()
            .subscribe(users => {
                this.allUserList = users;
            });
    }

    get form(): { [p: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    changeStatus(courseReg: CourseRegistration, blockStatus: boolean, verifyStatus: boolean): void {
        const updatedCourseRegistration: CourseRegistration = {
            id: courseReg.id,
            canvas_user_id: courseReg.canvas_user_id,
            is_verified: verifyStatus,
            is_blocked: blockStatus,
            token_uses: courseReg.token_uses,
            total_tokens_received: courseReg.total_tokens_received,
            available_tokens: courseReg.available_tokens,
            user_id: courseReg.user_id,
        };
        this.courseDashboardService.updateBlockStatus(updatedCourseRegistration)
            .subscribe(() => {
                this.toastr.success('The block status has been changed successfully.');
                this.updateDashboard();
            }, error => {
                this.toastr.error(error);
                console.warn(error);
            });
    }

    getBlockStatus(id: number): boolean {
        return this.registrationList.filter(reg => reg.user_id === id)[0].is_blocked;
    }

    getVerifyStatus(id: number): boolean {
        return this.registrationList.filter(reg => reg.user_id === id)[0].is_verified;
    }

    addOpen(content: unknown): void {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            centered: true,
            scrollable: true,
            size: "xl"
        });
    }

    unregisterOpen(content: unknown, regId: number): void {
        this.courseRegId = regId;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
    }

    unregisterUser(): void {
        this.courseDashboardService.unregisterUser(this.courseRegId)
            .subscribe(() => {
                this.toastr.success('The student has been unregistered.');
                this.updateDashboard();
            }, error => {
                this.toastr.error(error);
                console.warn(error);
            });
    }

    register(registeredUser: User): void {
        this.courseService.dashboardRegister(this.courseId, registeredUser).subscribe(
            courseRegResponse => {
                if (courseRegResponse.bad_request) {
                    this.toastr.error('Something went wrong. Please make sure that the student is not in the course.');
                } else {
                    this.toastr.success('The student has been added to the course.');
                    this.updateDashboard();
                    this.retrieveStudentNotIn();
                }
            }
        );
    }

    retrieveStudentNotIn(): void {
        this.courseDashboardService
            .getUnregisteredStudents(this.courseId)
            .subscribe(unregisteredUsers => {
                this.unregisteredUsers = unregisteredUsers;
            });
        //this.unregisteredUsers = this.allUserList.filter(({ id: id1 }) => !this.userList.some(({ id: id2 }) => id2 === id1));
    }

    hasViewPermission(userId: number): boolean {
        return this.user.is_teacher || !!this.registrationList.find(course => course.canvas_user_id === userId);
    }

    updateDashboard(): void {
        this.courseDashboardService
            .getCourseDashboard(this.courseId)
            .subscribe(users => {
                this.userList = users;
            });

        this.courseDashboardService
            .getCourseRegistration(this.courseId)
            .subscribe(registrations => {
                this.registrationList = registrations;
            });
    }
}
