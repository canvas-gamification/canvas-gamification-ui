import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseEvent, EventType} from '@app/_models';
import {CourseEventService} from '@app/_services/api/course/course-event.service';
import {ToastrService} from "ngx-toastr";
import {AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

const dateValidator: (controls: AbstractControl) => void = (controls: AbstractControl) => {
    const start = controls.get('startPicker');
    const end = controls.get('endPicker');
    return start.value > end.value ? start.setErrors({
        forbiddenDateRange: {
            startDate: start.value,
            endDate: end.value
        }
    }) : null;
};

@Component({
    selector: 'app-course-event-create',
    templateUrl: './course-event-create-edit.component.html',
    styleUrls: ['./course-event-create-edit.component.scss']
})
export class CourseEventCreateEditComponent implements OnInit {
    localEventTypes: EventType[];
    courseId: number;
    eventId: number;
    formData: FormGroup;

    constructor(private route: ActivatedRoute,
                private builder: FormBuilder,
                private courseEventService: CourseEventService,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.formData = this.builder.group({
            name: new FormControl('', [Validators.required]),
            type: new FormControl('', [Validators.required]),
            countForTokens: new FormControl('', [Validators.required]),
            startPicker: new FormControl(new Date(), [Validators.required]),
            endPicker: new FormControl(new Date(), [Validators.required])
        }, {validator: dateValidator} as AbstractControlOptions);
        this.courseEventService.getEventTypes().subscribe(response => this.localEventTypes = response);
        // Convert to number
        this.courseId = +this.route.snapshot.paramMap.get('courseId');
        if (this.route.snapshot.paramMap.get('eventId')) {
            this.eventId = +this.route.snapshot.paramMap.get('eventId');
            this.courseEventService.getCourseEvent(this.eventId).subscribe(
                event => {
                    this.formData.patchValue({
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

    formatFormData(formData: FormGroup): CourseEvent {
        return {
            id: formData.get('eventId').value,
            name: formData.get('evenName').value,
            type: formData.get('eventType').value,
            count_for_tokens: formData.get('countsForTokens').value,
            start_date: formData.get('startTime').value,
            end_date: formData.get('endTime').value,
            course: this.courseId
        };
    }

    submitEvent(formData: FormGroup): void {
        const ourEvent: CourseEvent = this.formatFormData(formData);

        if (this.eventId) { // If this is a previously existing event
            this.courseEventService.updateCourseEvent(ourEvent).subscribe(() => {
                this.toastr.success('The Event has been updated Successfully.');
                window.scroll(0, 0);
            }, error => {
                this.toastr.error(error.responseText);
                console.warn(error.responseText);
                window.scroll(0, 0);
            });
        } else { // Creating a brand new event
            this.courseEventService.addCourseEvent(ourEvent).subscribe(
                () => {
                    this.router.navigate(['course/view', this.courseId]).then();
                    this.toastr.success('The Event has been added Successfully.');
                    window.scroll(0, 0);
                }, error => {
                    this.toastr.error(error.responseText);
                    console.warn(error.responseText);
                    window.scroll(0, 0);
                }
            );
        }
    }
}
