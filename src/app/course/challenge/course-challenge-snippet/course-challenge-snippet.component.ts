import {Component, OnInit} from '@angular/core'
import {Course, CourseEvent, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute} from "@angular/router"
import {Team} from "@app/_models/team"
import {TeamService} from "@app/course/_services/team.service"


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
    courseEvents: CourseEvent[]
    currentDate: Date = new Date()
    availableEvents: CourseEvent[]
    upcomingEvents: CourseEvent[]
    pastEvents: CourseEvent[]
    myTeam: Team

    constructor(
        private authenticationService: AuthenticationService,
        private courseService: CourseService,
        private route: ActivatedRoute,
        private teamService: TeamService,
    ) {
        this.courseId = this.route.snapshot.parent.params.courseId
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
            this.events = course?.events

            // this.events.forEach( event => {
            //     this.teamService.getMyTeam(event?.id).subscribe( team => this.team = team)
            // })

            this.availableEvents = this.events.filter(
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

    //returns if a student is
    // async isSoloTeam(challenge: CourseEvent): Promise<boolean> {
    isSoloTeam(challenge: CourseEvent): boolean {
        // await this.teamService.getMyTeam(challenge?.id).subscribe( myTeam => this.myTeam = myTeam)
        // return this.myTeam.member_names.length === 1
        return true
    }

}
