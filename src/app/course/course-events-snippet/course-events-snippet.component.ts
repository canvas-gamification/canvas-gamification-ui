import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core'
import {Course, CourseEvent, EventType, User} from '@app/_models'
import {AuthenticationService} from '@app/_services/api/authentication'
import {CourseEventService} from '@app/course/_services/course-event.service'
import {TuiDialogContext, TuiDialogService, TuiNotification, TuiNotificationsService} from "@taiga-ui/core"
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'

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
    @ViewChild('importDialog') importDialog: PolymorpheusContent<TuiDialogContext>
    currentDate: Date = new Date()

    upcomingEvents: CourseEvent[]
    pastEvents: CourseEvent[]
    upcomingAssignments: CourseEvent[]
    pastAssignments: CourseEvent[]
    upcomingExams: CourseEvent[]
    pastExams: CourseEvent[]

    showAssignment = true
    showExam = true

    upcomingEventsTemp: CourseEvent[]
    pastEventsTemp: CourseEvent[]

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
        this.events.sort((e1,e2) => new Date(e1.start_date).getTime() - new Date(e2.start_date).getTime())
        this.upcomingEvents = this.events.filter(event => event.is_open || event.is_not_available_yet).filter(event => event.type =="ASSIGNMENT" || event.type =="EXAM")
        this.pastEvents = this.events.filter(event => event.is_closed).filter(event => event.type =="ASSIGNMENT" || event.type =="EXAM")


        this.upcomingAssignments = this.upcomingEvents.filter( event => event.type == 'ASSIGNMENT')
        this.pastAssignments = this.pastEvents.filter( event => event.type == 'ASSIGNMENT')

        this.upcomingExams = this.upcomingEvents.filter( event => event.type == 'EXAM')
        this.pastExams = this.pastEvents.filter( event => event.type == 'EXAM')

        this.upcomingEventsTemp = this.upcomingEvents
        this.pastEventsTemp = this.pastEvents
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

    toggleFilterAssignments():void {
        this.showAssignment = !this.showAssignment
        this.toggleFilterHelper()
    }

    toggleFilterExams():void {
        this.showExam = !this.showExam
        this.toggleFilterHelper()
    }

    toggleFilterHelper(): void{
        if (this.showAssignment && this.showExam){
            this.upcomingEvents = this.upcomingEventsTemp
            this.pastEvents = this.pastEventsTemp

        }
        if (this.showAssignment && !this.showExam){
            this.upcomingEvents = this.upcomingAssignments
            this.pastEvents = this.pastAssignments
        }
        if (!this.showAssignment && this.showExam){
            this.upcomingEvents = this.upcomingExams
            this.pastEvents = this.pastExams
        }
        if (!this.showAssignment && !this.showExam){
            this.upcomingEvents = this.upcomingEventsTemp
            this.pastEvents = this.pastEventsTemp
            this.showAssignment = true
            this.showExam = true
        }
    }

}
