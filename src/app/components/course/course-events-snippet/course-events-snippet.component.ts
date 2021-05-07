import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseEventService} from '@app/_services/api/course/course-event.service';

@Component({
    selector: 'app-course-events-snippet',
    templateUrl: './course-events-snippet.component.html',
    styleUrls: ['./course-events-snippet.component.scss']
})
export class CourseEventsSnippetComponent implements OnInit {
    @Input() events: CourseEvent[];
    @Input() courseId: number;
    eventTypes: any;
    user: User;

    constructor(private authenticationService: AuthenticationService, private courseEventService: CourseEventService) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
        this.courseEventService.getEventTypes().subscribe(response => this.eventTypes = response);
    }

    ngOnInit(): void {
    }

    getEventButtonText(event: CourseEvent): string {
        if (this.eventTypes) {
            return ((this.user.is_teacher) ? 'Open ' : 'Do ') + this.eventTypes[event.type];
        }
    }

    isExamAndOpen(event: CourseEvent): boolean {
        return event.is_open && event.is_exam;
    }

}
