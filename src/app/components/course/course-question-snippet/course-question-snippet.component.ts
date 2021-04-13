import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, Question, UQJ, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute, Router} from '@angular/router';
import {UqjService} from '@app/_services/api/uqj.service';
import {forkJoin} from 'rxjs';
import {CourseEventService} from '@app/_services/api/course/course-event.service';
import {CourseService} from '@app/_services/api/course/course.service';

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
    courseId: number;

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute,
                private uqjService: UqjService,
                private courseEventService: CourseEventService,
                private courseService: CourseService) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        this.courseId = +this.route.snapshot.paramMap.get('courseId') || null;
        this.eventId = +this.route.snapshot.paramMap.get('eventId') || null;
        if (this.eventId && this.courseId) { // if this snippet is an event-view
            const needsToBeRegistered = this.user.is_student;
            this.courseService.validateEvent(this.courseId, this.eventId, needsToBeRegistered).subscribe(response => {
                if (response.success) {
                    forkJoin({
                        event: this.courseEventService.getCourseEvent(this.eventId),
                        uqjs: this.uqjService.getUQJs({filters: {question__event: this.eventId}}),
                    }).subscribe(result => {
                        this.event = result.event;
                        this.uqjs = result.uqjs.results;
                    });
                } else {
                    this.router.navigate(['course/view', this.courseId]).then();
                }
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

    highlight(status: string) {
        if (status.localeCompare('Solved') === 0){
            return ' success';
        }
        else if (status.localeCompare('Partially Solved') === 0){
            return ' warning';
        }
        else if (status.localeCompare('Unsolved') === 0){
            return ' danger';
        }
        return '';
    }
}
