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

    breadCrumbs = []

    constructor(
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.courseId = this.route.snapshot.params.courseId
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    calculateBreadCrumbs(route: ActivatedRouteSnapshot, index: number) {
        if (route.data.breadCrumb) {
            if (!(route.data.breadCrumb === "Homepage2")) {
                this.breadCrumbs.push({
                    name: route.data.breadCrumb,
                    url: route.url[0]?.path,
                })
            }
        }

        if (route.firstChild) {
            this.calculateBreadCrumbs(route.firstChild, index + 1)
        }
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })

        console.debug(this.route.snapshot)
        console.debug(this.route.snapshot.firstChild)

        this.calculateBreadCrumbs(this.route.snapshot, 1)
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((x) => {
            // console.debug(x)
            console.debug('NavigationEnd')
            this.breadCrumbs = []
            this.calculateBreadCrumbs(this.route.snapshot, 1)
        })
    }
}
