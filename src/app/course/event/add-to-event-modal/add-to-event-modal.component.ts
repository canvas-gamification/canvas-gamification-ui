import {Component, EventEmitter, Input, Output} from '@angular/core'
import {CourseEvent} from "@app/_models"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core"

@Component({
    selector: 'app-add-to-event-modal',
    templateUrl: './add-to-event-modal.component.html',
    styleUrls: ['./add-to-event-modal.component.scss']
})
export class AddToEventModalComponent {
    @Input() open = false
    @Output() readonly openChange = new EventEmitter<boolean>()
    @Input() questionId: number
    @Input() events: CourseEvent[]



    constructor(
        private readonly courseEventService: CourseEventService,
        private readonly notificationService: TuiNotificationsService,
    ) { }


    toggleDialog(open: boolean) {
        this.open = open
        this.openChange.emit(this.open)
    }

    addToEvent(event: CourseEvent) {
        this.courseEventService.addQuestion(event.id, this.questionId).subscribe(() => {
            this.notificationService.show("Question added to event.", {
                status: TuiNotification.Success,
            }).subscribe()
        })
    }
}
