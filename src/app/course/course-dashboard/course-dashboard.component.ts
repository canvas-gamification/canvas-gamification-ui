import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute} from '@angular/router';
import {Course, CourseRegistration, User} from '@app/_models';
import {CourseDashboardServiceService} from "@app/course/_services/course-dashboard.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-course-dashboard',
    templateUrl: './course-dashboard.component.html',
    styleUrls: ['./course-dashboard.component.scss']
})

export class CourseDashboardComponent implements OnInit {
    courseId: number;
    userId: number;
    user: User;

    userList: User[];
    registrationList: CourseRegistration[];
    variable: boolean;

    filterQueryString;

    pageSize: number;
    pageEvent: PageEvent;

    paramChanged: Subject<{
        page: number,
        page_size: number,
        search: string,
        parentCategory: string,
        subCategory: string,
        difficulty: string,
        is_sample: string,
        ordering: string
    }> = new Subject<{
        page: number,
        page_size: number,
        search: string,
        parentCategory: string,
        subCategory: string,
        difficulty: string,
        is_sample: string,
        ordering: string
    }>();

    constructor(private authenticationService: AuthenticationService,
                private courseService: CourseDashboardServiceService,
                private toastr: ToastrService,
                private route: ActivatedRoute,
                private modalService: NgbModal) {
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
        this.courseService.updateBlockStatus(updatedCourseRegistration)
            .subscribe(() => {
                this.toastr.success('The block status has been changed successfully.');
                this.courseService
                    .getCourseRegistration(this.courseId)
                    .subscribe(registrations => {
                        this.registrationList = registrations;
                    });
            }, error => {
                this.toastr.error(error);
                console.warn(error);
            });
    }

    getBlockStatus(id: number):boolean {
        return this.registrationList.filter(reg => reg.user_id === id)[0].is_blocked;
    }

    getVerifyStatus(id: number): boolean {
        return this.registrationList.filter(reg => reg.user_id === id)[0].is_verified;
    }

    open(content: unknown): void {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, scrollable: true, size : "xl"});
    }

    unregisterUser(courseRegId:number): void {
        this.courseService.unregisterUser(courseRegId)
            .subscribe(() => {
                this.toastr.success('The block has been changed successfully.');
                this.courseService
                    .getCourseDashboard(this.courseId)
                    .subscribe(users => {
                        this.userList = users;
                    });
            }, error => {
                this.toastr.error(error);
                console.warn(error);
            });
    }

    update(): void {
        const options = {
            ...(this.pageEvent && {
                page: this.pageEvent.pageIndex + 1,
                page_size: this.pageEvent.pageSize,
            }),
            ...this.filterQueryString
        };
        this.paramChanged.next(options);
    }

    hasViewPermission(userId: number): boolean {
        return this.user.is_teacher || !!this.registrationList.find(course => course.canvas_user_id === userId);
    }
}
