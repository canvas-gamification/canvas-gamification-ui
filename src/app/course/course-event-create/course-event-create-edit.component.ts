import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseEvent, EventType} from '@app/_models';
import {CourseEventService} from '@app/_services/api/course/course-event.service';
import {ToastrService} from "ngx-toastr";
import {FormGroup} from '@angular/forms';
import {CourseEventForm} from "@app/course/_forms/course-event.form";

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
                private courseEventService: CourseEventService,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.formData = CourseEventForm.createForm();
        this.courseEventService.getEventTypes().subscribe(response => this.localEventTypes = response);
        // Convert to number
        this.courseId = +this.route.snapshot.paramMap.get('courseId');
        if (this.route.snapshot.paramMap.get('eventId')) {
            this.eventId = +this.route.snapshot.paramMap.get('eventId');
            this.courseEventService.getCourseEvent(this.eventId).subscribe(
                event => {
                    this.formData = CourseEventForm.createFormWithData(event);
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
            }, error => {
                this.toastr.error(error);
            });
        } else { // Creating a brand new event
            this.courseEventService.addCourseEvent(ourEvent).subscribe(
                () => {
                    this.router.navigate(['course/view', this.courseId]).then();
                    this.toastr.success('The Event has been added Successfully.');
                }, error => {
                    this.toastr.error(error);
                }
            );
        }
    }
}
