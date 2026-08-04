import {Component, EventEmitter, Inject, Input, OnInit, Output, ChangeDetectionStrategy} from '@angular/core'
import {CourseEvent, User} from "@app/_models"
import {AuthenticationService} from "@app/_services/api/authentication"
import {TuiDialogContext, TuiDialogService, TuiNotificationService} from "@taiga-ui/core"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {Router} from "@angular/router"
import {PolymorpheusContent} from "@taiga-ui/polymorpheus"

@Component({
    selector: 'app-event-row',
    templateUrl: './event-row.component.html',
    styleUrls: ['./event-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EventRowComponent implements OnInit {

    @Input() event: CourseEvent
    @Output() readonly reload = new EventEmitter<boolean>()
    user: User

    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly courseEventService: CourseEventService,
        private readonly notificationsService: TuiNotificationService,
        private router: Router,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    ) {
    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    setFeatured() {
        return this.courseEventService.setFeatured(this.event.id).subscribe(() => {
            this.notificationsService.open('Assessment successfully marked as featured.', {
                appearance: 'success',
            }).subscribe()
            this.reload.emit(true)
        })
    }

    clearFeatured() {
        return this.courseEventService.clearFeatured(this.event.id).subscribe(() => {
            this.notificationsService.open('Assessment successfully unmarked as featured.', {
                appearance: 'success',
            }).subscribe()
            this.reload.emit(true)
        })
    }

    /**
     * Opens the dialog service based on the template passed
     * @param content - the template to be used
     * @param openDialog - the boolean condition used to check if template should be opened
     */
    openEditDialog(
        content: PolymorpheusContent<TuiDialogContext>,
        openDialog: boolean
    ): void {
        if (openDialog) {
            this.dialogService.open(content, {
                closable: false,
                label: 'Edit finished assessment?'
            }).subscribe()
        } else {
            this.router.navigate(['/course', this.event.course, 'assignments-exams', this.event.id, 'edit']).then()
        }
    }

    /**
     * Delete an event from the course-list.
     */
    deleteEvent() {
        return this.courseEventService.deleteCourseEvent(this.event.id).subscribe(() => {
            this.notificationsService.open('Assessment successfully deleted.', {
                appearance: 'success',
            }).subscribe()
            this.reload.emit(true)
        })
    }

    /**
     * Dialog for confirming if you want to delete a question.
     * @param content - The modal to open.
     */
    openDeleteEventDialog(
        content: PolymorpheusContent<TuiDialogContext>
    ): void {
        this.dialogService.open(content, {
            closable: false,
            label: 'Delete Assessment?'
        }).subscribe(() => this.deleteEvent())
    }
}
