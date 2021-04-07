import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, User, EVENT_TYPES} from '@app/_models';
import {formatDate} from '@angular/common';

@Component({
    selector: 'app-course-events-snippet',
    templateUrl: './course-events-snippet.component.html',
    styleUrls: ['./course-events-snippet.component.scss']
})
export class CourseEventsSnippetComponent implements OnInit {
    @Input() events: CourseEvent[];
    @Input() courseId: number;
    @Input() teacherForClass: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    getEventButtonText(event: CourseEvent): string {
        if (this.teacherForClass) {
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
