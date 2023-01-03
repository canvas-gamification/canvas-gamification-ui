import {Component, Input, OnInit} from '@angular/core'
import {CourseEvent, User} from "@app/_models"
import {TeamService} from "@app/course/_services/team.service"
import {Team} from "@app/_models/team"
import {AuthenticationService} from "@app/_services/api/authentication"

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
    ) { }

    ngOnInit(): void {
        this.teamService.getMyTeam(this.event.id).subscribe(team => this.team = team)
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    isSoloTeam(): boolean {
        return this.team.member_names.length === 1
    }
}
