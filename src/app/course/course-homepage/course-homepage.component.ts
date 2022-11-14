import {Component, OnInit} from '@angular/core'
import {Course, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute} from "@angular/router"

@Component({
    selector: 'app-course-homepage',
    templateUrl: './course-homepage.component.html',
    styleUrls: ['./course-homepage.component.scss']
})
export class CourseHomepageComponent implements OnInit {
    course: Course
    courseId: number
    user: User

    items: {
        caption: string
        routerLink: string
    }[]

    constructor(
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        private route: ActivatedRoute
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
        this.authenticationService.currentUser.subscribe(user => this.user = user)
        this.items = [{
            caption: `Course Homepage`,
            routerLink: `/course/${this.courseId}`
        }]
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
    }
}
