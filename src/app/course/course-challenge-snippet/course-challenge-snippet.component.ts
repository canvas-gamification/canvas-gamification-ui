import {Component, Input, OnInit} from '@angular/core'
import {Course, CourseEvent, EventType, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {CourseEventService} from "@app/course/_services/course-event.service"

@Component({
    selector: 'app-course-challenge-snippet',
    templateUrl: './course-challenge-snippet.component.html',
    styleUrls: ['./course-challenge-snippet.component.scss'],
})
export class CourseChallengeSnippetComponent implements OnInit{
    @Input() events: CourseEvent[]
    @Input() course: Course
    courseId: number
    user: User
    eventTypes: EventType[]
    courseEvents: CourseEvent[]
    currentDate: Date = new Date()

    upcomingEvents: CourseEvent[]
    pastEvents: CourseEvent[]


    constructor(
        private authenticationService: AuthenticationService,
        private courseEventService: CourseEventService
    ){}

    ngOnInit(): void {
        this.courseId = this.course.id
        this.authenticationService.currentUser.subscribe(user => this.user = user)
        this.courseEventService.getEventTypes().subscribe(response => {
            this.eventTypes = response
        })

        this.events.sort((e1,e2) => new Date(e1.start_date).getTime() - new Date(e2.start_date).getTime())
        this.upcomingEvents = this.events.filter(event => event.is_open || event.is_not_available_yet).filter(event => event.type == "CHALLENGE")
        this.pastEvents = this.events.filter(event => event.is_closed).filter(event => event.type == "CHALLENGE")
    }

}
