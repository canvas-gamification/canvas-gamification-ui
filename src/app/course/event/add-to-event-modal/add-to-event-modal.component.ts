import { TuiNotificationService } from "@taiga-ui/core";
import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core'
import {CourseEvent} from "@app/_models"
import {CourseEventService} from "@app/course/_services/course-event.service"

@Component({
    selector: 'app-add-to-event-modal',
    templateUrl: './add-to-event-modal.component.html',
    styleUrls: ['./add-to-event-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AddToEventModalComponent {
    @Input() open = false
    @Output() readonly openChange = new EventEmitter<boolean>()
    @Input() questionId: number
    @Input() openEvents: CourseEvent[]
    @Input() closedEvents: CourseEvent[]

    constructor(
        private readonly courseEventService: CourseEventService,
        private readonly notificationService: TuiNotificationService,
    ) {
    }

    toggleDialog(open: boolean) {
        this.open = open
        this.openChange.emit(this.open)
    }

    addToEvent(event: CourseEvent) {
        this.courseEventService.addQuestion(event.id, this.questionId).subscribe(() => {
            this.notificationService.open("Question added to event.", {
                appearance: 'success',
            }).subscribe()
        })
    }
}
