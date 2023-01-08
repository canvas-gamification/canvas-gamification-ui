import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {CourseEvent, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {CourseEventService} from "@app/course/_services/course-event.service"

@Component({
    selector: 'app-event-row',
    templateUrl: './event-row.component.html',
    styleUrls: ['./event-row.component.scss']
})
export class EventRowComponent implements OnInit {

    @Input() event: CourseEvent
    @Output() readonly reload = new EventEmitter<boolean>()
    user: User

    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly courseEventService: CourseEventService,
        private readonly notificationsService: TuiNotificationsService
    ) { }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    setFeatured() {
        return this.courseEventService.setFeatured(this.event.id).subscribe(() => {
            this.notificationsService.show('Event successfully marked as featured.', {
                status: TuiNotification.Success,
            }).subscribe()
            this.reload.emit(true)
        })
    }
}
