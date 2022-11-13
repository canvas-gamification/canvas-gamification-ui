import {Component, OnInit} from '@angular/core'
import {Course, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute} from "@angular/router"

@Component({
    selector: 'app-course-practice-concept-map',
    templateUrl: './course-practice-concept-map.component.html',
    styleUrls: ['./course-practice-concept-map.component.scss']
})
export class CoursePracticeConceptMapComponent implements OnInit {

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
        this.courseId = this.route.snapshot.params.courseId
        this.authenticationService.currentUser.subscribe(user => this.user = user)
        this.items = [{
            caption: `Course Homepage`,
            routerLink: `/course/${this.courseId}`
        }, {
            caption: `Practice`,
            routerLink: `/course/${this.courseId}/practice`
        }, {
            caption: `Concept Map`,
            routerLink: `/course/${this.courseId}/practice/concept-map`
        }]
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
    }

}
