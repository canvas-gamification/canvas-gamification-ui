import {Component, OnInit} from '@angular/core'
import {AuthenticationService} from '@app/_services/api/authentication'
import {CourseService} from '@app/course/_services/course.service'
import {Course, User} from '@app/_models'
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router'

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    course: Course
    courseId: number
    user: User
    breadCrumbs:
        [{
            caption: string,
            routerLink: string
        }]

    constructor(
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        private route: ActivatedRoute
    ) {
        this.courseId = this.route.snapshot.params.courseId
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    getBreadCrumbs(route: ActivatedRouteSnapshot) {
        if (route.firstChild.data.breadCrumbs) {
            this.breadCrumbs = route.firstChild.data.breadCrumbs.map(breadCrumb => (
                {
                    ...breadCrumb,
                    routerLink: breadCrumb.routerLink.replace(':courseId', this.courseId)
                }
            ))
        }
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
        this.getBreadCrumbs(this.route.snapshot)
    }
}
