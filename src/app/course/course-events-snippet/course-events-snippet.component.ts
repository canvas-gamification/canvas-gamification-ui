import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core'
import {Course, CourseEvent, EventType, User} from '@app/_models'
import {AuthenticationService} from '@app/_services/api/authentication'
import {CourseEventService} from '@app/course/_services/course-event.service'
import {TuiDialogContext, TuiDialogService, TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'

enum EventFilterOptions {
    ALL = 'Assignments and Exams',
    ASSIGNMENT = 'Assignments Only',
    EXAM = 'Exams Only',
}

@Component({
    selector: 'app-course-events-snippet',
    templateUrl: './course-events-snippet.component.html',
    styleUrls: ['./course-events-snippet.component.scss']
})
export class CourseEventsSnippetComponent implements OnInit {
    @Input() events: CourseEvent[]
    @Input() course: Course
    courseId: number
    eventTypes: EventType[]
    user: User
    courseEvents: CourseEvent[]
    filter: EventFilterOptions = EventFilterOptions.ALL
    @ViewChild('importDialog') importDialog: PolymorpheusContent<TuiDialogContext>

    constructor(
        private authenticationService: AuthenticationService,
        private courseEventService: CourseEventService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService
    ) {
    }

    ngOnInit(): void {
        this.courseId = this.course.id
        this.authenticationService.currentUser.subscribe(user => this.user = user)
        this.courseEventService.getEventTypes().subscribe(response => {
            this.eventTypes = response
        })
    }

    getEventFilterOptions(): EventFilterOptions[] {
        return Object.values(EventFilterOptions)
    }

    getEvents(): CourseEvent[] {
        switch (this.filter) {
        case EventFilterOptions.ALL:
            return this.events.filter(event => event.type === 'ASSIGNMENT' || event.type === 'EXAM')
        case EventFilterOptions.ASSIGNMENT:
            return this.events.filter(event => event.type === 'ASSIGNMENT')
        case EventFilterOptions.EXAM:
            return this.events.filter(event => event.type === 'EXAM')
        }
    }

    getUpcomingEvents(): CourseEvent[] {
        return this.getEvents().filter(event => event.is_open || event.is_not_available_yet)
    }

    getPastEvents(): CourseEvent[] {
        return this.getEvents().filter(event => event.is_closed)
    }

    /**
     * Gets all available course events and then opens a dialog with import template.
     */
    openEventImportDialog(): void {
        this.courseEvents = null
        this.courseEventService.getAllEvents().subscribe(events => {
            this.courseEvents = events
        })
        this.dialogService.open(
            this.importDialog,
            {label: 'Select an Event to Import', size: 'l', closeable: false}
        ).subscribe()
    }

    /**
     * Duplicates the selected event.
     * @param event - The event to duplicate/import.
     * @param courseId - The course you are importing the event into.
     */
    importCourseEvent(event: CourseEvent, courseId: number): void {
        this.courseEventService.importCourseEvent(event, courseId).subscribe((response) => {
            if (response.status === 201) {
                this.notificationsService
                    .show('The Event has been Imported Successfully.', {
                        status: TuiNotification.Success
                    }).subscribe()
            }
        })
    }
}
