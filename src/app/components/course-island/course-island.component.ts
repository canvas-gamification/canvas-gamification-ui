import {Component, Input, OnInit} from '@angular/core'
import {Course, STATUS, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {Router} from "@angular/router"


@Component({
    selector: 'app-course-island',
    templateUrl: './course-island.component.html',
    styleUrls: ['./course-island.component.scss']
})
export class CourseIslandComponent implements OnInit {
    @Input() course: Course
    @Input() skeleton = false
    user: User
    readonly STATUS = STATUS
    endDate: Date
    currentDate: Date

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    ngOnInit(): void {
        if (!this.skeleton)
            this.endDate = new Date(this.course.end_date)
        this.currentDate = new Date()
    }

    canView(): boolean {
        return (
            this.user?.is_teacher ||
            (
                (this.course.has_view_permission || !this.course.is_registered)
                && this.endDate > this.currentDate && this.user?.is_student
            )
        )
    }

    getIslandClass(): string {
        return `course-island ${this.canView() ? 'tui-island_hoverable' : ''}`
    }

    redirect(): void {
        if (
            this.user?.is_teacher
            || (
                (this.course.has_view_permission
                && this.endDate > this.currentDate
                && this.user?.is_student)
            )
        ) {
            this.router.navigate(['/course', this.course?.id]).then()
        } else if (
            !this.course.is_registered
            && this.endDate > this.currentDate
            && this.user?.is_student
        ) {
            this.router.navigate(['/course', this.course?.id, 'register']).then()
        }
    }
}
