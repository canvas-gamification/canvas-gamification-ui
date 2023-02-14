import {Component, Input, OnInit} from '@angular/core'
import {CourseEvent, User} from "@app/_models"
import {TeamService} from "@app/course/_services/team.service"
import {Team} from "@app/_models/team"
import {AuthenticationService} from "@app/_services/api/authentication"
import {startCase} from "lodash"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {Router} from "@angular/router"

@Component({
    selector: 'app-challenge-row',
    templateUrl: './challenge-row.component.html',
    styleUrls: ['./challenge-row.component.scss']
})
export class ChallengeRowComponent implements OnInit {

    @Input() event: CourseEvent
    team: Team
    user: User
    constructor(
        private teamService: TeamService,
        private authenticationService: AuthenticationService,
        private courseEventService: CourseEventService,
        private readonly notificationsService: TuiNotificationsService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.teamService.getMyTeam(this.event.id).subscribe(team => this.team = team)
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    getChallengeType(): string {
        return startCase(this.event.challenge_type?.toLowerCase())
    }

    deleteChallenge(): void {
        this.courseEventService.deleteCourseEvent(this.event.id).subscribe( () => {
            this.notificationsService
                .show('The challenge has been deleted successfully.', {
                    status: TuiNotification.Success
                }).subscribe()
            this.refreshPage()
        })
    }

    refreshPage(): void {
        const currentUrl = this.router.url
        this.router.onSameUrlNavigation = 'reload'
        this.router.navigate([currentUrl]).then(() => {
            window.scroll(0, 0)
        })
    }
}
