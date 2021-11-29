import {Component, Inject, Input, OnInit} from '@angular/core';
import {Course, CourseEvent, EventType, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseEventService} from '@app/course/_services/course-event.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";

@Component({
    selector: 'app-course-events-snippet',
    templateUrl: './course-events-snippet.component.html',
    styleUrls: ['./course-events-snippet.component.scss']
})
export class CourseEventsSnippetComponent implements OnInit {
    @Input() events: CourseEvent[];
    @Input() course: Course;
    courseId: number;
    eventTypes: EventType[];
    eventTypesMap: Map<string, string>;
    user: User;
    courseEvents: CourseEvent[];

    constructor(private authenticationService: AuthenticationService,
                private courseEventService: CourseEventService,
                private modalService: NgbModal,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService) {
    }

    ngOnInit(): void {
        this.courseId = this.course.id;
        this.authenticationService.currentUser.subscribe(user => this.user = user);
        this.courseEventService.getEventTypes().subscribe(response => {
            this.eventTypes = response;
            this.eventTypesMap = new Map(this.eventTypes.map(([k, v]) => [k, v])); //Make a map for easy access
        });
    }

    /**
     * Returns the button text based on the type of event & user
     * @param event - the object for which the button text is needed
     */
    getEventButtonText(event: CourseEvent): string {
        if (this.eventTypes) {
            return ((this.user.is_teacher) ? 'Open ' : 'Do ') + this.eventTypesMap.get(event.type);
        }
    }

    /**
     * Returns whether the specified event is an open exam
     * @param event - event object to check
     */
    isExamAndOpen(event: CourseEvent): boolean {
        return event.is_open && event.is_exam;
    }

    /**
     * Opens a given modal.
     * @param content - The modal to open.
     */
    open(content: unknown): void {
        this.courseEventService.getAllEvents().subscribe(events => this.courseEvents = events);
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
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
                    }).subscribe();
            }
        });
    }
}
