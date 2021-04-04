import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, Question, UQJ, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute} from '@angular/router';
import {UqjService} from '@app/_services/api/uqj.service';
import {forkJoin} from 'rxjs';
import {CourseEventService} from '@app/_services/api/course/course-event.service';

@Component({
    selector: 'app-course-question-snippet',
    templateUrl: './course-question-snippet.component.html',
    styleUrls: ['./course-question-snippet.component.scss']
})
export class CourseQuestionSnippetComponent implements OnInit {
    @Input() questions: Question[];
    @Input() uqjs: UQJ[];
    user: User;
    event: CourseEvent;
    eventId: number;

    constructor(private authenticationService: AuthenticationService,
                private route: ActivatedRoute,
                private uqjService: UqjService,
                private courseEventService: CourseEventService, ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('eventId')) { // if this snippet is an event-view
            this.eventId = +this.route.snapshot.paramMap.get('eventId'); // the '+' casts this to a number from a string
            forkJoin({
                event: this.courseEventService.getCourseEvent(this.eventId),
                uqjs: this.uqjService.getUQJs({filters: {question__event: this.eventId}}),
            }).subscribe(result => {
                this.event = result.event;
                this.uqjs = result.uqjs.results;
            });
        }
    }

    getStatus(uqj: UQJ): string {
        if (!uqj.question.event || !uqj.question.event.is_exam) { // If the event exists
            // TODO: couldn't the condition just be if(uqj.question.event)? What was this supposed to do?
            return uqj.status;
        }

        if (uqj.question.event.is_exam && uqj.num_attempts > 0) {
            return 'Submitted';
        } else if (uqj.question.event.is_exam) {
            return 'Not submitted';
        }
    }
}
