import {Component, Input, OnInit} from '@angular/core'
import {Course, CourseEvent, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"


@Component({
    selector: 'app-course-challenge-snippet',
    templateUrl: './course-challenge-snippet.component.html',
    styleUrls: ['./course-challenge-snippet.component.scss'],
})
export class CourseChallengeSnippetComponent implements OnInit{
    @Input() events: CourseEvent[]
    @Input() course: Course
    user: User
    courseEvents: CourseEvent[]
    currentDate: Date = new Date()
    upcomingEvents: CourseEvent[]
    pastEvents: CourseEvent[]


    constructor(private authenticationService: AuthenticationService){}

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
        this.upcomingEvents = this.events.filter(event => event.is_open || event.is_not_available_yet).filter(event => event.type == "CHALLENGE")
        this.pastEvents = this.events.filter(event => event.is_closed).filter(event => event.type == "CHALLENGE")
    }

}
