import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, User, EVENT_TYPES} from '@app/_models';
import {formatDate} from '@angular/common';
import {AuthenticationService} from '@app/_services/api/authentication';

@Component({
    selector: 'app-course-events-snippet',
    templateUrl: './course-events-snippet.component.html',
    styleUrls: ['./course-events-snippet.component.scss']
})
export class CourseEventsSnippetComponent implements OnInit {
    @Input() events: CourseEvent[];
    @Input() courseId: number;
    user: User;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
    }

    getEventButtonText(event: CourseEvent): string {
        if (this.user.is_teacher) {
            const strAppend = EVENT_TYPES[event.type].name;
            return 'Open ' + strAppend;
        } else {
            return EVENT_TYPES[event.type].buttonText;
        }
    }

    isExamAndOpen(event: CourseEvent): boolean {
        return event.is_open && event.is_exam;
    }

}
