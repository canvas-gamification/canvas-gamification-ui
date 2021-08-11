import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, EventType, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseEventService} from '@app/course/_services/course-event.service';

@Component({
    selector: 'app-course-events-snippet',
    templateUrl: './course-events-snippet.component.html',
    styleUrls: ['./course-events-snippet.component.scss']
})
export class CourseEventsSnippetComponent implements OnInit {
    @Input() events: CourseEvent[];
    @Input() courseId: number;
    eventTypes: EventType[];
    eventTypesMap: Map<string, string>;
    user: User;

    constructor(private authenticationService: AuthenticationService, private courseEventService: CourseEventService) {
    }

    ngOnInit(): void {
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

}
