import {Component, OnInit} from '@angular/core'
import {Course, User} from '@app/_models'
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute} from "@angular/router"
import {AuthenticationService} from "@app/_services/api/authentication"

@Component({
    selector: 'app-course-practice',
    templateUrl: './course-practice.component.html',
    styleUrls: ['./course-practice.component.scss']
})
export class CoursePracticeComponent implements OnInit {
    course: Course
    courseId: number
    user: User

    items: {
        caption: string
        routerLink: string
    }[]

    constructor(
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private courseService: CourseService
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
        console.log(this.route.snapshot.params)
        this.authenticationService.currentUser.subscribe(user => this.user = user)
        this.items = [{
            caption: `Course Homepage`,
            routerLink: `/course/${this.courseId}`
        }, {
            caption: `Practice`,
            routerLink: `/course/${this.courseId}/practice`
        }]
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
    }

}
