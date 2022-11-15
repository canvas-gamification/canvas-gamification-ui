import {Component, OnInit} from '@angular/core'
import {Course} from "@app/_models"
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router"
import {Observable} from "rxjs"
import {filter, tap} from "rxjs/operators"

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
    course: Course
    courseId: number

    navEnd: Observable<NavigationEnd>

    items: {
        caption: string
        routerLink: string
    }[]

    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private r: Router
    ) {
        this.courseId = this.route.snapshot.params.courseId
        this.navEnd = r.events.pipe(
            filter(evt => evt instanceof NavigationEnd),
            tap(this.setBreadcrumbs)
        ) as Observable<NavigationEnd>
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
        this.navEnd.subscribe()
        // this.items = [{
        //     caption: this.route.firstChild.snapshot.data.breadcrumb.string,
        //     routerLink: `/course/${this.courseId}`
        // }]
        // this.route.firstChild.data.subscribe(data => this.items = [{
        //     caption: data.breadcrumb.string,
        //     routerLink: `/course/${this.courseId}`
        // }])
    }

    setBreadcrumbs(): void {
        this.items = [{
            caption: this.route.firstChild.snapshot.data.breadcrumb.string,
            routerLink: `/course/${this.courseId}`
        }]
    }



}
