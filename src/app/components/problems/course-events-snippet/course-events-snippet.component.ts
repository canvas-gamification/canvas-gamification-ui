import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, User} from '@app/_models';
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
            let strAppend = event.type.toLowerCase();
            strAppend = strAppend.charAt(0).toUpperCase() + strAppend.substr(1, strAppend.length);
            return 'Open ' + strAppend;
        } else {
            if (event.type === 'ASSIGNMENT') {
                return 'Complete Assignment';
            } else if (event.type === 'PRACTICE') {
                return 'Start Practice';
            } else if (event.type === 'EXAM') {
                return 'Take Exam';
            } else // Should never happen
            {
                return 'Open';
            }
        }
    }

    isExamAndOpen(event: CourseEvent): boolean {
        return event.is_open && event.is_exam;
    }

}
