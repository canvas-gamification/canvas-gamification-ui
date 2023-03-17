import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core'
import {CourseEvent, User} from "@app/_models"
import {TeamService} from "@app/course/_services/team.service"
import {Team} from "@app/_models/team"
import {AuthenticationService} from "@app/_services/api/authentication"
import {startCase} from "lodash"
import {UserActionsService} from "@app/_services/api/user-actions.service"
import {
    TuiDialogContext,
    TuiDialogService,
    TuiNotification,
    TuiNotificationsService
} from "@taiga-ui/core"
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus"
import {CourseEventService} from "@app/course/_services/course-event.service"

@Component({
    selector: 'app-challenge-row',
    templateUrl: './challenge-row.component.html',
    styleUrls: ['./challenge-row.component.scss']
})
export class ChallengeRowComponent implements OnInit {

    @Input() event: CourseEvent
    @Output() readonly reload = new EventEmitter<boolean>()
    team: Team
    user: User

    constructor(
        private teamService: TeamService,
        private authenticationService: AuthenticationService,
        private userAction: UserActionsService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        private courseEventService: CourseEventService,
        private readonly notificationsService: TuiNotificationsService,
    ) { }

    ngOnInit(): void {
        this.teamService.getMyTeam(this.event.id).subscribe(team => this.team = team)
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    getChallengeType(): string {
        return startCase(this.event.challenge_type?.toLowerCase())
    }

    showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
        this.dialogService.open(
            content,
            {label: 'You are about to delete this challenge!', size: 'l', closeable: true}
        ).subscribe()
    }

    deleteChallenge(): void {
        this.courseEventService.deleteCourseEvent(this.event.id).subscribe( () => {
            this.notificationsService.show('Challenge has been successfully deleted.', {
                status: TuiNotification.Success,
            }).subscribe()
            this.reload.emit(true)
        })
    }
}
