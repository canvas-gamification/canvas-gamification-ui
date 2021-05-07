import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseEvent, EVENT_TYPES, MESSAGE_TYPES} from '@app/_models';
import {CourseEventService} from '@app/_services/api/course/course-event.service';
import {MessageService} from '@app/_services/message.service';


@Component({
    selector: 'app-course-event-create',
    templateUrl: './course-event-create-edit.component.html',
    styleUrls: ['./course-event-create-edit.component.scss']
})
export class CourseEventCreateEditComponent implements OnInit {
    localEventTypes = EVENT_TYPES;
    courseId: number;
    minDate: Date;
    eventId: number;
    invalid: boolean;

    // Two way bound variables on inputs
    eventName: string;
    eventType: string;
    countsForTokens: boolean;
    startTime: Date;
    endTime: Date;

    constructor(private route: ActivatedRoute, private courseEventService: CourseEventService, private messageService: MessageService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getMinDate();
        // Convert to number
        this.courseId = +this.route.snapshot.paramMap.get('courseId');
        if (this.route.snapshot.paramMap.get('eventId')) {
            this.eventId = +this.route.snapshot.paramMap.get('eventId');
            this.courseEventService.getCourseEvent(this.eventId).subscribe(
                event => {
                    this.eventName = event.name;
                    this.eventType = event.type;
                    this.startTime = new Date(event.start_date);
                    this.endTime = new Date(event.end_date);
                    this.countsForTokens = event.count_for_tokens;
                    this.checkCanSubmit();
                }
            );
            this.checkCanSubmit();
        } else {
            this.countsForTokens = false; // needs a default value specifically
            this.invalid = true;
        }
    }

    getMinDate(): void {
        this.minDate = new Date();
    }

    retrieveFormData(): CourseEvent {
        return {
            id: this.eventId,
            name: this.eventName,
            type: this.eventType,
            count_for_tokens: this.countsForTokens,
            start_date: this.startTime,
            end_date: this.endTime,
            course: this.courseId
        };
    }

    submitEvent(): void {
        const ourEvent: CourseEvent = this.retrieveFormData();

        if (this.eventId) { // If this is a previously existing event
            this.courseEventService.updateCourseEvent(ourEvent).subscribe(response => {
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'The Event has been updated Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                console.warn(error.responseText);
                window.scroll(0, 0);
            });
        } else { // Creating a brand new event
            this.courseEventService.addCourseEvent(ourEvent).subscribe(
                newEvent => {
                    this.router.navigate(['course/view', this.courseId]);
                    this.messageService.add(MESSAGE_TYPES.SUCCESS, 'The Event has been added Successfully.');
                    window.scroll(0, 0);
                }, error => {
                    this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                    console.warn(error.responseText);
                    window.scroll(0, 0);
                }
            );
        }
    }

    checkCanSubmit(): void {
        if (this.eventName?.length > 0 && this.eventType?.length > 0 && this.endTime > this.startTime) {
            this.invalid = false;
            return;
        }
        this.invalid = true;
    }
}
