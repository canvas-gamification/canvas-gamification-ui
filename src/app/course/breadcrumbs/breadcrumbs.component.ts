import {Component, OnInit} from '@angular/core'
import {Course} from "@app/_models"
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute} from "@angular/router"

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
    course: Course
    courseId: number

    items: {
        caption: string
        routerLink: string
    }[]

    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute
    ) {
        this.courseId = this.route.snapshot.params.courseId
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
        this.items = [{
            caption: `Course Homepage`,
            routerLink: `/course/${this.courseId}`
        }]
    }

}
