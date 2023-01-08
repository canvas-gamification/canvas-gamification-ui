import {Component, OnInit} from '@angular/core'
import {Course, CourseEvent, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute} from "@angular/router"


@Component({
    selector: 'app-course-challenge-snippet',
    templateUrl: './course-challenge-snippet.component.html',
    styleUrls: ['./course-challenge-snippet.component.scss'],
})
export class CourseChallengeSnippetComponent implements OnInit {
    events: CourseEvent[]
    course: Course
    user: User
    courseId: number
    currentEvents: CourseEvent[]
    upcomingEvents: CourseEvent[]
    pastEvents: CourseEvent[]

    constructor(
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        private route: ActivatedRoute,
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
            this.events = course?.events

            this.currentEvents = this.events.filter(
                event => event.is_open
            ).filter(event => event.type === "CHALLENGE")
            this.upcomingEvents = this.events.filter(
                event => event.is_not_available_yet
            ).filter(event => event.type === "CHALLENGE")
            this.pastEvents = this.events.filter(
                event => event.is_closed
            ).filter(event => event.type === "CHALLENGE")
        })
        this.authenticationService.currentUser.subscribe(user => this.user = user)

    }
}
