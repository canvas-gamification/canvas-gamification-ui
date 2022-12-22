import {Component, OnInit} from '@angular/core'
import {AuthenticationService} from '@app/_services/api/authentication'
import {CourseService} from '@app/course/_services/course.service'
import {Course, User} from '@app/_models'
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router'
import {filter} from "rxjs/operators"

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
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.courseId = this.route.snapshot.params.courseId
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    getBreadCrumbs(route: ActivatedRouteSnapshot) {
        if (route.firstChild.data.breadCrumbs) {
            this.breadCrumbs = route.firstChild.data.breadCrumbs.map(breadCrumb => (
                {
                    ...breadCrumb,
                    routerLink: breadCrumb.routerLink
                        .replace(':courseId', this.courseId)
                        .replace(':goalId', route.firstChild.params.goalId)
                        .replace(':eventId', route.firstChild.params.eventId)
                        .replace(':id', route.firstChild.params.id)
                        .replace(':categoryId', route.firstChild.params.categoryId)
                }
            ))
        }
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
        this.getBreadCrumbs(this.route.snapshot)
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.breadCrumbs = null
            this.getBreadCrumbs(this.route.snapshot)
        })
    }
}
