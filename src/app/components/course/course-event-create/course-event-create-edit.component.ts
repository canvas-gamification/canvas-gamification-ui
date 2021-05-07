import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseEvent, MESSAGE_TYPES} from '@app/_models';
import {CourseEventService} from '@app/_services/api/course/course-event.service';
import {MessageService} from '@app/_services/message.service';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

const DateValidator: ValidatorFn = (formGroup: FormGroup) => {
    const start = formGroup.get('startPicker').value;
    const end = formGroup.get('endPicker').value;
    return start > end ? {forbiddenDateRange: {startDate: start, endDate: end}} : null;
};

@Component({
    selector: 'app-course-event-create',
    templateUrl: './course-event-create-edit.component.html',
    styleUrls: ['./course-event-create-edit.component.scss']
})
export class CourseEventCreateEditComponent implements OnInit {
    localEventTypes: any;
    courseId: number;
    eventId: number;
    FormData: FormGroup;

    constructor(private route: ActivatedRoute,
                private builder: FormBuilder,
                private courseEventService: CourseEventService,
                private messageService: MessageService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.FormData = this.builder.group({
            name: new FormControl('', [Validators.required]),
            type: new FormControl('', [Validators.required]),
            countForTokens: new FormControl('', [Validators.required]),
            startPicker: new FormControl(new Date(), [Validators.required]),
            endPicker: new FormControl(new Date(), [Validators.required])
        }, {validator: DateValidator});
        this.courseEventService.getEventTypes().subscribe(response => this.localEventTypes = response);
        // Convert to number
        this.courseId = +this.route.snapshot.paramMap.get('courseId');
        if (this.route.snapshot.paramMap.get('eventId')) {
            this.eventId = +this.route.snapshot.paramMap.get('eventId');
            this.courseEventService.getCourseEvent(this.eventId).subscribe(
                event => {
                    this.FormData.patchValue({
                        name: event.name,
                        type: event.type,
                        countForTokens: event.count_for_tokens,
                        startPicker: new Date(event.start_date),
                        endPicker: new Date(event.end_date),
                    });
                }
            );
        }
    }

    formatFormData(formData): CourseEvent {
        return {
            id: formData.eventId,
            name: formData.eventName,
            type: formData.eventType,
            count_for_tokens: formData.countsForTokens,
            start_date: formData.startTime,
            end_date: formData.endTime,
            course: this.courseId
        };
    }

    submitEvent(formData): void {
        const ourEvent: CourseEvent = this.formatFormData(formData);

        if (this.eventId) { // If this is a previously existing event
            this.courseEventService.updateCourseEvent(ourEvent).subscribe(() => {
                this.messageService.add(MESSAGE_TYPES.SUCCESS, 'The Event has been updated Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.messageService.add(MESSAGE_TYPES.DANGER, error.responseText);
                console.warn(error.responseText);
                window.scroll(0, 0);
            });
        } else { // Creating a brand new event
            this.courseEventService.addCourseEvent(ourEvent).subscribe(
                () => {
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
}
