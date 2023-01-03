import {Component, Inject, OnInit} from '@angular/core'
import {Team} from "@app/_models/team"
import {ActivatedRoute} from "@angular/router"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {Course, CourseEvent, User} from "@app/_models"
import {TeamService} from "@app/course/_services/team.service"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {AuthenticationService} from "@app/_services/api/authentication"
import {CourseService} from "@app/course/_services/course.service"

@Component({
    selector: 'app-list-of-teams',
    templateUrl: './list-of-teams.component.html',
    styleUrls: ['./list-of-teams.component.scss']
})
export class ListOfTeamsComponent  implements OnInit {
    user: User
    teams: Team[]
    eventId: number
    event: CourseEvent
    courseId: number
    course: Course

    constructor(
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private courseService: CourseService,
        private courseEventService: CourseEventService,
        private teamService: TeamService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
    ){
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.parent.paramMap.get('courseId')
        this.courseService.getCourse(this.courseId).subscribe( course => this.course = course)

        this.eventId = +this.route.snapshot.paramMap.get('eventId')
        this.courseEventService.getCourseEvent(this.eventId).subscribe(event => this.event = event)
        this.teamService.getChallengeTeams(this.eventId).subscribe(teams => this.teams = teams)
    }

    joinTeam(teamId: number): void{
        this.teamService.joinTeam(teamId).subscribe(() => {
            this.notificationsService
                .show('You have successfully join the team.', {
                    status: TuiNotification.Success
                })
        })
        window.location.reload()
    }

    isInTeam(team: Team): boolean{
        return team.course_registrations.map( courseReg => +courseReg ).includes(this.course.course_reg.id)
    }
}
